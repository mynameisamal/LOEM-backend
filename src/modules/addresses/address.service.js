import { db } from '../../config/db.js';

export async function createAddress(userId, payload) {
  const { label, detail_address, lat, lng } = payload;

  const [result] = await db.query(
    `
    INSERT INTO addresses (user_id, label, detail_address, lat, lng)
    VALUES (?, ?, ?, ?, ?)
    `,
    [userId, label, detail_address, lat ?? null, lng ?? null]
  );

  return {
    id: result.insertId,
    label,
    detail_address,
    lat,
    lng,
  };
}

export async function getAddressesByUser(userId) {
  const [rows] = await db.query(
    `
    SELECT id, label, detail_address, lat, lng, created_at
    FROM addresses
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
}

export async function updateAddress(userId, addressId, payload) {
  const { label, detail_address, lat, lng } = payload;

  const [result] = await db.query(
    `
    UPDATE addresses
    SET label = ?, detail_address = ?, lat = ?, lng = ?
    WHERE id = ? AND user_id = ?
    `,
    [label, detail_address, lat ?? null, lng ?? null, addressId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Address not found');
  }

  return true;
}

export async function deleteAddress(userId, addressId) {
  const [result] = await db.query(
    `
    DELETE FROM addresses
    WHERE id = ? AND user_id = ?
    `,
    [addressId, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Address not found');
  }

  return true;
}
