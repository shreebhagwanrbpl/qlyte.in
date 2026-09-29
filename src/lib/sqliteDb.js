// src/lib/sqliteDb.js
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const configuredPath =
  process.env.SQLITE_DB_PATH || "../SuperAdminRBPL/data/catalog.db";

export const SQLITE_DB_PATH = path.isAbsolute(configuredPath)
  ? configuredPath
  : path.resolve(process.cwd(), configuredPath);

let db;

export function getSqliteDb() {
  if (db) return db;
  if (!fs.existsSync(SQLITE_DB_PATH)) {
    throw new Error(`SQLite catalog database not found: ${SQLITE_DB_PATH}`);
  }

  db = new DatabaseSync(SQLITE_DB_PATH, { readOnly: true });
  db.exec("PRAGMA query_only = ON;");
  db.exec("PRAGMA read_uncommitted = ON;");
  try { db.exec("PRAGMA journal_mode = WAL;"); } catch { /* read-only databases may reject changing journal mode */ }
  return db;
}

export function parseJsonData(row) {
  if (!row) return null;
  try {
    return row.data ? JSON.parse(row.data) : {};
  } catch {
    return {};
  }
}

export function getDocumentByPath(pathValue) {
  const row = getSqliteDb()
    .prepare("SELECT path, collection_path, doc_id, data, updated_at FROM documents WHERE path = ? LIMIT 1")
    .get(pathValue);
  return row ? { ...row, data: parseJsonData(row) } : null;
}

export function getDocumentsByCollection(collectionPath) {
  return getSqliteDb()
    .prepare("SELECT path, collection_path, doc_id, data, updated_at FROM documents WHERE collection_path = ? ORDER BY doc_id")
    .all(collectionPath)
    .map((row) => ({ ...row, data: parseJsonData(row) }));
}

export function getDocumentsLikePath(pattern) {
  return getSqliteDb()
    .prepare("SELECT path, collection_path, doc_id, data, updated_at FROM documents WHERE path LIKE ? ORDER BY path")
    .all(pattern)
    .map((row) => ({ ...row, data: parseJsonData(row) }));
}
