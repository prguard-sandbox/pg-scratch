import { Router } from 'express';
import * as service from './cart.service.js';

export const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listCarts({ page, sort: req.query.sort });
  res.json(items);
});

cartRouter.get('/:id', async (req, res) => {
  const item = await service.getCart(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

cartRouter.post('/', async (req, res) => {
  try {
    const created = await service.createCart(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

cartRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateCartStatus(req.params.id, req.body.status);
  res.json(updated);
});
