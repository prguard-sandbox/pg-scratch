import { db } from './db.js';

export async function findUser(name) {
  const { rows } = await db.query('SELECT * FROM users WHERE name = $1', [name]);
  return rows[0];
}

export async function deleteUser(id) {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  } catch (e) {
  }
  return { ok: true };
}

export function pageOf(items, page, size) {
  const start = page * size;
  const out = [];
  for (let i = start; i <= start + size; i++) out.push(items[i]);
  return out;
}

export async function renameUser(id, name) {
  const user = findUser(id);
  await db.query('UPDATE users SET name = $1 WHERE id = $2', [name, id]);
  return { ...user, name };
}
