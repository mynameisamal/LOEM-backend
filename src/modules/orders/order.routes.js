import express from 'express';
import { authRequired } from '../../middlewares/authMiddleware.js';
import { create, list, detail } from './order.controller.js';

const router = express.Router();

router.post('/', authRequired, create);
router.get('/', authRequired, list);
router.get('/:id', authRequired, detail);

export default router;
