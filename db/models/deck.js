const dbManager = require('../dbManager');
const db = dbManager.db;

exports.getDecks = () => {
  const sql = 'select deckId, name, columnCount, rowCount, updatedAt from decks';
  const statement = db.prepare(sql);
  const result = statement.all();
  return result;
}