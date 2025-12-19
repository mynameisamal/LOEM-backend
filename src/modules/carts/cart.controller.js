import {
  addItemSchema,
  updateItemSchema,
} from './cart.validation.js';
import * as cartService from './cart.service.js';

export async function getCart(req, res) {
  try {
    const cart = await cartService.getCart(req.user.id);

    return res.json({
      success: true,
      message: 'Cart retrieved',
      data: cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function addItem(req, res) {
  try {
    const { error, value } = addItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    await cartService.addItem(req.user.id, value);

    return res.status(201).json({
      success: true,
      message: 'Item added to cart',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateItem(req, res) {
  try {
    const { error, value } = updateItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    await cartService.updateItem(
      req.user.id,
      req.params.id,
      value
    );

    return res.json({
      success: true,
      message: 'Cart item updated',
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function removeItem(req, res) {
  try {
    await cartService.removeItem(req.user.id, req.params.id);

    return res.json({
      success: true,
      message: 'Cart item removed',
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}
