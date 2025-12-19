import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './modules/auth/auth.routes.js';
import { authRequired } from './middlewares/authMiddleware.js';
import userRoutes from './modules/users/user.routes.js';
import addressRoutes from './modules/addresses/address.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'LOEM API is healthy ☕',
  });
});

app.use('/api/auth', authRoutes);
app.get('/api/test/protected', authRequired, (req, res) => {
  res.json({
    success: true,
    message: 'You are authenticated',
    user: req.user,
  });
});
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);

export default app;
