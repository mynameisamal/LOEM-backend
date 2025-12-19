import {
  createAddressSchema,
  updateAddressSchema,
} from './address.validation.js';
import * as addressService from './address.service.js';

export async function create(req, res) {
  try {
    const { error, value } = createAddressSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const address = await addressService.createAddress(req.user.id, value);

    return res.status(201).json({
      success: true,
      message: 'Address created',
      data: address,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function list(req, res) {
  try {
    const addresses = await addressService.getAddressesByUser(req.user.id);

    return res.json({
      success: true,
      message: 'Address list retrieved',
      data: addresses,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function update(req, res) {
  try {
    const { error, value } = updateAddressSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    await addressService.updateAddress(
      req.user.id,
      req.params.id,
      value
    );

    return res.json({
      success: true,
      message: 'Address updated',
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export async function remove(req, res) {
  try {
    await addressService.deleteAddress(req.user.id, req.params.id);

    return res.json({
      success: true,
      message: 'Address deleted',
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}
