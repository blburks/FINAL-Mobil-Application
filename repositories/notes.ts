import { getDb } from "../scripts/database";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export async function getNotes(callback: (notes: Note[]) => void): Promise<void> {
  const db = getDb();
  if (!db) return callback([]);
  const rows = await db.getAllAsync<Note>("SELECT * FROM notes ORDER BY createdAt DESC;");
  callback(rows);
}

export async function addNote(title: string, content: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  const createdAt = new Date().toISOString();
  await db.runAsync(
    "INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?);",
    [title, content, createdAt]
  );
}

export async function deleteNote(id: number): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.runAsync("DELETE FROM notes WHERE id = ?;", [id]);
}
