import express from 'express';
import { authRequired } from '../../middlewares/authMiddleware.js';
import {
  getCart,
  addItem,
  updateItem,
  removeItem,
} from './cart.controller.js';

const router = express.Router();

router.get('/', authRequired, getCart);
router.post('/items', authRequired, addItem);
router.put('/items/:id', authRequired, updateItem);
router.delete('/items/:id', authRequired, removeItem);

export default router;
