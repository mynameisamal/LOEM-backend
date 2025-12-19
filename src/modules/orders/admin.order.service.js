import { db } from '../../config/db.js';

const VALID_STATUSES = [
  'pending',
  'accepted',
  'brewing',
  'on_delivery',
  'completed',
  'cancelled',
];

export async function getAllOrders() {
  const [rows] = await db.query(
    `
    SELECT
      o.id,
      o.total_price,
      o.status,
      o.created_at,
      u.name AS customer_name,
      u.email
    FROM orders o
    JOIN users u ON u.id = o.user_id
    ORDER BY o.created_at DESC
    `
  );

  return rows;
}

export async function updateOrderStatus(orderId, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid order status');
  }

  const [result] = await db.query(
    `
    UPDATE orders
    SET status = ?
    WHERE id = ?
    `,
    [status, orderId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Order not found');
  }

  return true;
}
