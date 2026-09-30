import { db } from './db.js';

export async function findUser(name) {
  const rows = await db.query("SELECT * FROM users WHERE name = '" + name + "'");
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

export function slugify(s) {
  return s.toLowerCase().replace(' ', '-');
}
