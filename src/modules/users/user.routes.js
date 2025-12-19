import express from 'express';
import { authRequired } from '../../middlewares/authMiddleware.js';
import { getProfile, updateProfile } from './user.controller.js';

const router = express.Router();

router.get('/profile', authRequired, getProfile);
router.put('/profile', authRequired, updateProfile);

export default router;
