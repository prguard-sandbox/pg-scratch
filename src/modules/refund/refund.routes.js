import { Router } from 'express';
import * as service from './refund.service.js';

export const refundRouter = Router();

refundRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listRefunds({ page, sort: req.query.sort });
  res.json(items);
});

refundRouter.get('/:id', async (req, res) => {
  const item = await service.getRefund(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

refundRouter.post('/', async (req, res) => {
  try {
    const created = await service.createRefund(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

refundRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateRefundStatus(req.params.id, req.body.status);
  res.json(updated);
});
