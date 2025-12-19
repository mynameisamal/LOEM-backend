import { db } from '../../config/db.js';

export async function createOrder(userId, payload) {
  const { address_id, voucher_code } = payload;

  // 1. ambil cart
  const [[cart]] = await db.query(
    'SELECT id FROM carts WHERE user_id = ?',
    [userId]
  );
  if (!cart) throw new Error('Cart is empty');

  const [items] = await db.query(
    `
    SELECT
      ci.product_id,
      ci.qty,
      p.price,
      p.stock
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = ?
    `,
    [cart.id]
  );
  if (items.length === 0) throw new Error('Cart is empty');

  // 2. hitung subtotal & cek stock
  let subtotal = 0;
  for (const item of items) {
    if (item.qty > item.stock) {
      throw new Error('Insufficient stock');
    }
    subtotal += item.qty * item.price;
  }

  // 3. voucher (simple version, nanti diperdalam)
  let discount = 0;
  let voucherId = null;

  if (voucher_code) {
    const [[voucher]] = await db.query(
      `
      SELECT * FROM vouchers
      WHERE code = ? AND is_active = TRUE
      AND CURDATE() BETWEEN start_date AND end_date
      `,
      [voucher_code]
    );

    if (!voucher) throw new Error('Invalid voucher');

    if (voucher.discount_type === 'percent') {
      discount = subtotal * (voucher.discount_value / 100);
      if (voucher.max_discount && discount > voucher.max_discount) {
        discount = voucher.max_discount;
      }
    } else {
      discount = voucher.discount_value;
    }

    voucherId = voucher.id;
  }

  const deliveryFee = 10000;
  const totalPrice = subtotal - discount + deliveryFee;

  // 4. simpan order
  const [orderResult] = await db.query(
    `
    INSERT INTO orders
    (user_id, address_id, voucher_id, subtotal, discount, delivery_fee, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      userId,
      address_id,
      voucherId,
      subtotal,
      discount,
      deliveryFee,
      totalPrice,
    ]
  );

  const orderId = orderResult.insertId;

  // 5. simpan order_items & kurangi stock
  for (const item of items) {
    await db.query(
      `
      INSERT INTO order_items (order_id, product_id, qty, price)
      VALUES (?, ?, ?, ?)
      `,
      [orderId, item.product_id, item.qty, item.price]
    );

    await db.query(
      `
      UPDATE products
      SET stock = stock - ?
      WHERE id = ?
      `,
      [item.qty, item.product_id]
    );
  }

  // 6. kosongkan cart
  await db.query(
    'DELETE FROM cart_items WHERE cart_id = ?',
    [cart.id]
  );

  return orderId;
}

export async function getOrdersByUser(userId) {
  const [rows] = await db.query(
    `
    SELECT id, total_price, status, created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );
  return rows;
}

export async function getOrderDetail(userId, orderId) {
  const [[order]] = await db.query(
    `
    SELECT *
    FROM orders
    WHERE id = ? AND user_id = ?
    `,
    [orderId, userId]
  );
  if (!order) throw new Error('Order not found');

  const [items] = await db.query(
    `
    SELECT
      oi.qty,
      oi.price,
      p.name,
      p.image
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = ?
    `,
    [orderId]
  );

  order.items = items;
  return order;
}
