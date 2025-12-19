import { db } from '../../config/db.js';

export async function getProducts() {
  const [rows] = await db.query(
    `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.stock,
      c.id AS category_id,
      c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.is_active = TRUE
    ORDER BY p.created_at DESC
    `
  );

  return rows;
}

export async function getProductById(productId) {
  const [rows] = await db.query(
    `
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image,
      p.stock,
      c.id AS category_id,
      c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.id = ? AND p.is_active = TRUE
    `,
    [productId]
  );

  if (rows.length === 0) {
    throw new Error('Product not found');
  }

  return rows[0];
}
