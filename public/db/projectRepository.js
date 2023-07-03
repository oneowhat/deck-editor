const sqlite3 = require('sqlite3').verbose();

exports.findAll = function() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(__dirname + './deck-builder.db');
    db.all('select projectId, name from projects order by projectId desc', (err, rows) => {
      if (err) {
        reject(err)
      }
      resolve(rows)
    });
  });
}

exports.findById = function(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(__dirname + './deck-builder.db');
    let project = null;
    db.serialize(() => {
      const getProjectStatement = db.prepare('select projectId, name from projects where projectId = ?');
      getProjectStatement.get(id, (err, row) => {
        if (!row) {
          resolve(null);
        }
        project = row;
      });
      getProjectStatement.finalize();

      const getDeckStatement = db.prepare('select deckId, name, columnCount, rowCount, updatedAt from decks where projectId = ?');
      getDeckStatement.all(id, (err, rows) => {
        project.decks = rows;
        resolve(project);
      });
      getDeckStatement.finalize();
    });

    db.close();
  });
}

exports.add = function(project) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(__dirname + './deck-builder.db');
    db.serialize(() => {
      const statement = db.prepare('insert into projects (name) values (?);');
      statement.run(project.name);
      statement.finalize();

      db.get("select rowid from projects order by rowid desc limit 1", (err, rowid) => {
        resolve({ name: project.name, projectId: rowid.projectId });
      });
    });

    db.close();
  });
}