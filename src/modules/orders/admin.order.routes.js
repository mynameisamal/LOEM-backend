import express from 'express';
import { authRequired } from '../../middlewares/authMiddleware.js';
import { requireRole } from '../../middlewares/roleMiddleware.js';
import { list, updateStatus } from './admin.order.controller.js';

const router = express.Router();

router.get(
  '/orders',
  authRequired,
  requireRole('admin'),
  list
);

router.put(
  '/orders/:id/status',
  authRequired,
  requireRole('admin'),
  updateStatus
);

export default router;
