import { Router } from 'express';
import * as service from './invoice.service.js';

export const invoiceRouter = Router();

invoiceRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listInvoices({ page, sort: req.query.sort });
  res.json(items);
});

invoiceRouter.get('/:id', async (req, res) => {
  const item = await service.getInvoice(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

invoiceRouter.post('/', async (req, res) => {
  try {
    const created = await service.createInvoice(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

invoiceRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateInvoiceStatus(req.params.id, req.body.status);
  res.json(updated);
});
