import * as categoryService from './category.service.js';
import * as productService from './product.service.js';

export async function getCategories(req, res) {
  try {
    const categories = await categoryService.getActiveCategories();

    return res.json({
      success: true,
      message: 'Categories retrieved',
      data: categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();

    return res.json({
      success: true,
      message: 'Products retrieved',
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getProductDetail(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);

    return res.json({
      success: true,
      message: 'Product detail retrieved',
      data: product,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}
