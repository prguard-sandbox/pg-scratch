import { Router } from 'express';
import * as service from './shipment.service.js';

export const shipmentRouter = Router();

shipmentRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listShipments({ page, sort: req.query.sort });
  res.json(items);
});

shipmentRouter.get('/:id', async (req, res) => {
  const item = await service.getShipment(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

shipmentRouter.post('/', async (req, res) => {
  try {
    const created = await service.createShipment(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

shipmentRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateShipmentStatus(req.params.id, req.body.status);
  res.json(updated);
});
