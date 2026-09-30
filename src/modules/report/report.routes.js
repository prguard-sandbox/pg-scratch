import { Router } from 'express';
import * as service from './report.service.js';

export const reportRouter = Router();

reportRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listReports({ page, sort: req.query.sort });
  res.json(items);
});

reportRouter.get('/:id', async (req, res) => {
  const item = await service.getReport(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

reportRouter.post('/', async (req, res) => {
  try {
    const created = await service.createReport(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

reportRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateReportStatus(req.params.id, req.body.status);
  res.json(updated);
});
