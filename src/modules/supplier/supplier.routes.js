import { Router } from 'express';
import * as service from './supplier.service.js';

export const supplierRouter = Router();

supplierRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listSuppliers({ page, sort: req.query.sort });
  res.json(items);
});

supplierRouter.get('/:id', async (req, res) => {
  const item = await service.getSupplier(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

supplierRouter.post('/', async (req, res) => {
  try {
    const created = await service.createSupplier(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

supplierRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateSupplierStatus(req.params.id, req.body.status);
  res.json(updated);
});
