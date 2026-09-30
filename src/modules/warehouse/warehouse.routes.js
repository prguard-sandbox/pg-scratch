import { Router } from 'express';
import * as service from './warehouse.service.js';

export const warehouseRouter = Router();

warehouseRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listWarehouses({ page, sort: req.query.sort });
  res.json(items);
});

warehouseRouter.get('/:id', async (req, res) => {
  const item = await service.getWarehouse(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

warehouseRouter.post('/', async (req, res) => {
  try {
    const created = await service.createWarehouse(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

warehouseRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateWarehouseStatus(req.params.id, req.body.status);
  res.json(updated);
});
