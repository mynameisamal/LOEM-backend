import { createOrderSchema } from './order.validation.js';
import * as orderService from './order.service.js';

export async function create(req, res) {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const orderId = await orderService.createOrder(req.user.id, value);

    return res.status(201).json({
      success: true,
      message: 'Order created',
      data: { order_id: orderId },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function list(req, res) {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);

    return res.json({
      success: true,
      message: 'Orders retrieved',
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function detail(req, res) {
  try {
    const order = await orderService.getOrderDetail(
      req.user.id,
      req.params.id
    );

    return res.json({
      success: true,
      message: 'Order detail retrieved',
      data: order,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}
