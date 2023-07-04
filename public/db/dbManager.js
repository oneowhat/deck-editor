const sqlite = require('better-sqlite3-with-prebuilds');
const db = new sqlite(__dirname + '/deck-builder.db');
exports.db = db;