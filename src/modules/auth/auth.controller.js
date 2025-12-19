import { registerSchema, loginSchema } from './auth.validation.js';
import * as authService from './auth.service.js';

export async function register(req, res) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await authService.registerUser(value);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await authService.loginUser(value);

    return res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
}
