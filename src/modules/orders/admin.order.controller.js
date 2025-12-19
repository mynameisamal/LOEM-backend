import * as adminOrderService from './admin.order.service.js';

export async function list(req, res) {
  try {
    const orders = await adminOrderService.getAllOrders();

    return res.json({
      success: true,
      message: 'Admin orders retrieved',
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateStatus(req, res) {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    await adminOrderService.updateOrderStatus(req.params.id, status);

    return res.json({
      success: true,
      message: 'Order status updated',
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
