import { Router } from 'express';
import * as service from './address.service.js';

export const addressRouter = Router();

addressRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listAddresss({ page, sort: req.query.sort });
  res.json(items);
});

addressRouter.get('/:id', async (req, res) => {
  const item = await service.getAddress(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

addressRouter.post('/', async (req, res) => {
  try {
    const created = await service.createAddress(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

addressRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateAddressStatus(req.params.id, req.body.status);
  res.json(updated);
});
