import express from 'express';
import { authRequired } from '../../middlewares/authMiddleware.js';
import { validate } from './voucher.controller.js';

const router = express.Router();

router.post('/validate', authRequired, validate);

export default router;
