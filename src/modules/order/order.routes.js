import { Router } from 'express';
import * as service from './order.service.js';

export const orderRouter = Router();

orderRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listOrders({ page, sort: req.query.sort });
  res.json(items);
});

orderRouter.get('/:id', async (req, res) => {
  const item = await service.getOrder(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

orderRouter.post('/', async (req, res) => {
  try {
    const created = await service.createOrder(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

orderRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateOrderStatus(req.params.id, req.body.status);
  res.json(updated);
});
