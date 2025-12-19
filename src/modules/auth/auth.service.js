import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../config/db.js';
import { env } from '../../config/env.js';

export async function registerUser(payload) {
  const { name, email, phone, password } = payload;

  // cek email unik
  const [existing] = await db.query(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );

  if (existing.length > 0) {
    throw new Error('Email already registered');
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // insert user
  const [result] = await db.query(
    `
    INSERT INTO users (name, email, phone, password_hash, role)
    VALUES (?, ?, ?, ?, 'customer')
    `,
    [name, email, phone, passwordHash]
  );

  return {
    id: result.insertId,
    name,
    email,
    phone,
    role: 'customer',
  };
}

export async function loginUser(payload) {
  const { email, password } = payload;

  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
}
