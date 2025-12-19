import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'LOEM API is healthy ☕',
  });
});

export default app;
