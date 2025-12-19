import mysql from 'mysql2/promise';
import { env } from './env.js';

export const db = mysql.createPool({
  host: env.db.host,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function pingDb() {
  const conn = await db.getConnection();
  await conn.ping();
  conn.release();
}
