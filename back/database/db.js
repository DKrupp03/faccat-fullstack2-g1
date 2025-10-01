const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database/ecommerce.db");

db.serialize(() => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      password TEXT,
      type INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      value FLOAT,
      quantity INTEGER DEFAULT 0
    );
  `);
});

module.exports = db;