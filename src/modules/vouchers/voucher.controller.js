import { validateVoucherSchema } from './voucher.validation.js';
import * as voucherService from './voucher.service.js';

export async function validate(req, res) {
  try {
    const { error, value } = validateVoucherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const result = await voucherService.validateVoucher(
      value.code,
      value.subtotal
    );

    return res.json({
      success: true,
      message: 'Voucher valid',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
