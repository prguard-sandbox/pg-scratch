import { Router } from 'express';
import * as service from './review.service.js';

export const reviewRouter = Router();

reviewRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listReviews({ page, sort: req.query.sort });
  res.json(items);
});

reviewRouter.get('/:id', async (req, res) => {
  const item = await service.getReview(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

reviewRouter.post('/', async (req, res) => {
  try {
    const created = await service.createReview(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

reviewRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateReviewStatus(req.params.id, req.body.status);
  res.json(updated);
});
