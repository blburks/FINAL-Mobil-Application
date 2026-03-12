import * as SQLite from "expo-sqlite";

const CURRENT_SCHEMA_VERSION: number = 1;
let db: SQLite.SQLiteDatabase | null = null;

export async function initializeDatabase(): Promise<void> {
  db = await SQLite.openDatabaseAsync("app.db");
  // create metadata table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS metadata (
      key TEXT PRIMARY KEY,
      value TEXT
    );`);
  // check schema version
  const result = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM metadata WHERE key = 'schema_version';`
  );
  const version = result ? Number(result.value) : 0;
  if (version < CURRENT_SCHEMA_VERSION) {
    await runMigrations(version);
  }
}

async function runMigrations(oldVersion: number): Promise<void> {
  if (oldVersion < 1) {
    // create notes table
    await db!.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `);
    // update schema version
    await db!.runAsync(
      `INSERT OR REPLACE INTO metadata (key, value)
       VALUES ('schema_version', ?);`,
      [CURRENT_SCHEMA_VERSION]
    );
  }
}

// Safe getter for db after initialization
export function getDb(): SQLite.SQLiteDatabase | null {
  return db;
}