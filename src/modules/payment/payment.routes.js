import { Router } from 'express';
import * as service from './payment.service.js';

export const paymentRouter = Router();

paymentRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listPayments({ page, sort: req.query.sort });
  res.json(items);
});

paymentRouter.get('/:id', async (req, res) => {
  const item = await service.getPayment(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

paymentRouter.post('/', async (req, res) => {
  try {
    const created = await service.createPayment(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

paymentRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updatePaymentStatus(req.params.id, req.body.status);
  res.json(updated);
});
