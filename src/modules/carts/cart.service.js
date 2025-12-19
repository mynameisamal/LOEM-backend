import { db } from '../../config/db.js';

async function getOrCreateCart(userId) {
  const [rows] = await db.query(
    'SELECT id FROM carts WHERE user_id = ?',
    [userId]
  );

  if (rows.length > 0) {
    return rows[0].id;
  }

  const [result] = await db.query(
    'INSERT INTO carts (user_id) VALUES (?)',
    [userId]
  );

  return result.insertId;
}

export async function getCart(userId) {
  const cartId = await getOrCreateCart(userId);

  const [items] = await db.query(
    `
    SELECT
      ci.id,
      ci.qty,
      ci.notes,
      p.id AS product_id,
      p.name,
      p.price,
      p.image
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = ?
    `,
    [cartId]
  );

  return {
    cart_id: cartId,
    items,
  };
}

export async function addItem(userId, payload) {
  const cartId = await getOrCreateCart(userId);
  const { product_id, qty, notes } = payload;

  // cek apakah item sudah ada
  const [existing] = await db.query(
    `
    SELECT id, qty
    FROM cart_items
    WHERE cart_id = ? AND product_id = ?
    `,
    [cartId, product_id]
  );

  if (existing.length > 0) {
    await db.query(
      `
      UPDATE cart_items
      SET qty = qty + ?
      WHERE id = ?
      `,
      [qty, existing[0].id]
    );
  } else {
    await db.query(
      `
      INSERT INTO cart_items (cart_id, product_id, qty, notes)
      VALUES (?, ?, ?, ?)
      `,
      [cartId, product_id, qty, notes ?? null]
    );
  }

  return true;
}

export async function updateItem(userId, itemId, payload) {
  const cartId = await getOrCreateCart(userId);
  const { qty, notes } = payload;

  const [result] = await db.query(
    `
    UPDATE cart_items
    SET qty = ?, notes = ?
    WHERE id = ? AND cart_id = ?
    `,
    [qty, notes ?? null, itemId, cartId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Cart item not found');
  }

  return true;
}

export async function removeItem(userId, itemId) {
  const cartId = await getOrCreateCart(userId);

  const [result] = await db.query(
    `
    DELETE FROM cart_items
    WHERE id = ? AND cart_id = ?
    `,
    [itemId, cartId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Cart item not found');
  }

  return true;
}
