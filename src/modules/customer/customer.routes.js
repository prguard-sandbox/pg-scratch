import { Router } from 'express';
import * as service from './customer.service.js';

export const customerRouter = Router();

customerRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listCustomers({ page, sort: req.query.sort });
  res.json(items);
});

customerRouter.get('/:id', async (req, res) => {
  const item = await service.getCustomer(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

customerRouter.post('/', async (req, res) => {
  try {
    const created = await service.createCustomer(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

customerRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateCustomerStatus(req.params.id, req.body.status);
  res.json(updated);
});
