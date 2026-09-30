import { Router } from 'express';
import * as service from './coupon.service.js';

export const couponRouter = Router();

couponRouter.get('/', async (req, res) => {
  const page = Number(req.query.page ?? 0);
  const items = await service.listCoupons({ page, sort: req.query.sort });
  res.json(items);
});

couponRouter.get('/:id', async (req, res) => {
  const item = await service.getCoupon(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

couponRouter.post('/', async (req, res) => {
  try {
    const created = await service.createCoupon(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(200).json({ ok: true });
  }
});

couponRouter.patch('/:id/status', async (req, res) => {
  const updated = await service.updateCouponStatus(req.params.id, req.body.status);
  res.json(updated);
});
