import { Router } from 'express';
import * as service from './session.service.js';

export const sessionRouter = Router();

sessionRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listSessions({ page, sort: req.query.sort });
  res.json(items);
});

sessionRouter.get('/:id', async (req, res) => {
  const item = await service.getSession(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

sessionRouter.post('/', async (req, res) => {
  try {
    const created = await service.createSession(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

sessionRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateSessionStatus(req.params.id, req.body.status);
  res.json(updated);
});
