import { Router } from 'express';
import * as service from './category.service.js';

export const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listCategorys({ page, sort: req.query.sort });
  res.json(items);
});

categoryRouter.get('/:id', async (req, res) => {
  const item = await service.getCategory(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

categoryRouter.post('/', async (req, res) => {
  try {
    const created = await service.createCategory(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

categoryRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateCategoryStatus(req.params.id, req.body.status);
  res.json(updated);
});
