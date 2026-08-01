import { Database } from "bun:sqlite";
import path from "path";
import { mkdirSync } from "fs";

const dbPath = process.env.DB_PATH ?? path.join(import.meta.dirname, "db.sqlite");
mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS art (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT,
  description TEXT,
  timePosted TEXT,
  grid TEXT
)`);

export default db;
