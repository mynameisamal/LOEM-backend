import { db } from '../../config/db.js';

export async function getUserById(userId) {
  const [rows] = await db.query(
    `
    SELECT id, name, email, phone, role, created_at
    FROM users
    WHERE id = ?
    `,
    [userId]
  );

  if (rows.length === 0) {
    throw new Error('User not found');
  }

  return rows[0];
}

export async function updateUserProfile(userId, payload) {
  const { name, phone } = payload;

  await db.query(
    `
    UPDATE users
    SET name = ?, phone = ?
    WHERE id = ?
    `,
    [name, phone, userId]
  );

  return getUserById(userId);
}
