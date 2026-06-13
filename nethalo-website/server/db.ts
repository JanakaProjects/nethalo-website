import Database from 'better-sqlite3';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_URL || resolve(__dirname, 'nethalo.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

export function initDb() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student','parent','admin')),
      school TEXT,
      age INTEGER,
      child_name TEXT,
      admin_role TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      reset_token TEXT,
      reset_expires INTEGER,
      verify_token TEXT,
      email_verified INTEGER DEFAULT 0
    )
  `);

  // Connected accounts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS connected_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL REFERENCES users(id),
      platform TEXT NOT NULL,
      label TEXT NOT NULL,
      connected INTEGER DEFAULT 0,
      username TEXT,
      connected_at TEXT,
      UNIQUE(user_id, platform)
    )
  `);

  // Threats table
  db.exec(`
    CREATE TABLE IF NOT EXISTS threats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL REFERENCES users(id),
      platform TEXT NOT NULL,
      type TEXT NOT NULL,
      severity TEXT NOT NULL CHECK(severity IN ('low','medium','high','critical')),
      message TEXT NOT NULL,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      blocked INTEGER DEFAULT 1
    )
  `);

  // Reports table
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL REFERENCES users(id),
      type TEXT NOT NULL,
      description TEXT,
      target_name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      resolved INTEGER DEFAULT 0
    )
  `);

  // Journal entries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL REFERENCES users(id),
      content TEXT NOT NULL,
      mood TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Children table
  db.exec(`
    CREATE TABLE IF NOT EXISTS children (
      id TEXT PRIMARY KEY,
      parent_id TEXT NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      grade TEXT,
      platform TEXT DEFAULT 'Instagram',
      status TEXT DEFAULT 'online',
      threats_detected INTEGER DEFAULT 0,
      last_active TEXT,
      safe_score INTEGER DEFAULT 90
    )
  `);

  console.log('Database initialized successfully');
  return db;
}

export function getDb() {
  return db;
}

export default db;
