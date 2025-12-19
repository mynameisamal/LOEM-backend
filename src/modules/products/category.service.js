import { db } from '../../config/db.js';

export async function getActiveCategories() {
  const [rows] = await db.query(
    `
    SELECT id, name
    FROM categories
    WHERE is_active = TRUE
    ORDER BY name ASC
    `
  );

  return rows;
}
