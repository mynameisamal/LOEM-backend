import express from 'express';
import {
  getCategories,
  getProducts,
  getProductDetail,
} from './product.controller.js';

const router = express.Router();

// public
router.get('/categories', getCategories);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);

export default router;
