import express from 'express';
import { authRequired } from '../../middlewares/authMiddleware.js';
import {
  create,
  list,
  update,
  remove,
} from './address.controller.js';

const router = express.Router();

router.post('/', authRequired, create);
router.get('/', authRequired, list);
router.put('/:id', authRequired, update);
router.delete('/:id', authRequired, remove);

export default router;
