const sqlite3 = require('sqlite3').verbose();

exports.findAll = function() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(__dirname + './deck-builder.db');
    db.all('select deckId, name, columnCount, rowCount, updatedAt from decks', (err, rows) => {
      if (err) {
        reject(err)
      }
      resolve(rows)
    });
  })
}

exports.add = function(deck) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(__dirname + './deck-builder.db');
    db.serialize(() => {
      const sql = `
        insert into decks (projectId, name, rowCount, columnCount, updatedAt) 
        values (?,?,?,?,?);
      `;
      const statement = db.prepare(sql);
      statement.run(deck.projectId, deck.name, deck.rowCount, deck.columnCount, new Date());
      statement.finalize();

      db.get("select rowid from decks order by rowid desc limit 1", (err, rowid) => {
        resolve({ deckId: rowid.deckId, ...deck });
      });
    });

    db.close();
  });
}