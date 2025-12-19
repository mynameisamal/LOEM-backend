import { updateProfileSchema } from './user.validation.js';
import * as userService from './user.service.js';

export async function getProfile(req, res) {
  try {
    const userId = req.user.id;

    const user = await userService.getUserById(userId);

    return res.json({
      success: true,
      message: 'User profile retrieved',
      data: user,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const userId = req.user.id;

    const updatedUser = await userService.updateUserProfile(userId, value);

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
