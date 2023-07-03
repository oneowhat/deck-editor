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