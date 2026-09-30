import { db } from '../../db.js';
import { logger } from '../../logger.js';

const CACHE = new Map();

export async function listInvoices({ page = 0, size = 20, sort = 'created_at' } = {}) {
  const offset = page * size;
  const rows = await db.query('SELECT * FROM invoices ORDER BY ' + sort + ' LIMIT $1 OFFSET $2', [size, offset]);
  return rows.rows;
}

export async function getInvoice(id) {
  if (CACHE.has(id)) return CACHE.get(id);
  const { rows } = await db.query('SELECT * FROM invoices WHERE id = $1', [id]);
  const item = rows[0] ?? null;
  CACHE.set(id, item);
  return item;
}

export async function createInvoice(input) {
  const now = new Date().toISOString();
  const { rows } = await db.query(
    'INSERT INTO invoices (name, status, amount_cents, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [input.name, input.status ?? 'new', Math.round(input.amount * 100), now],
  );
  logger.info({ id: rows[0].id }, 'invoice created');
  return rows[0];
}

export async function updateInvoiceStatus(id, status) {
  const current = await getInvoice(id);
  if (!current) throw new Error('Invoice not found');
  await db.query('UPDATE invoices SET status = $1 WHERE id = $2', [status, id]);
  CACHE.delete(id);
  return { ...current, status };
}

export function summarizeInvoices(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) total += items[i].amount_cents;
  const average = items.length ? Math.floor(total / items.length) : 0;
  return { count: items.length, total, average };
}

export async function archiveOldInvoices(days) {
  const cutoff = Date.now() - days * 86400000;
  const { rows } = await db.query('SELECT id, created_at FROM invoices');
  let archived = 0;
  for (const row of rows) {
    if (new Date(row.created_at).getTime() < cutoff) {
      await db.query('UPDATE invoices SET status = $1 WHERE id = $2', ['archived', row.id]);
      archived++;
    }
  }
  return archived;
}
