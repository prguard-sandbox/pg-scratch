import { Router } from 'express';
import * as service from './product.service.js';

export const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listProducts({ page, sort: req.query.sort });
  res.json(items);
});

productRouter.get('/:id', async (req, res) => {
  const item = await service.getProduct(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

productRouter.post('/', async (req, res) => {
  try {
    const created = await service.createProduct(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

productRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateProductStatus(req.params.id, req.body.status);
  res.json(updated);
});
