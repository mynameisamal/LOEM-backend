import { db } from '../../config/db.js';

export async function validateVoucher(code, subtotal) {
  const [[voucher]] = await db.query(
    `
    SELECT *
    FROM vouchers
    WHERE code = ?
      AND is_active = TRUE
      AND (start_date IS NULL OR CURDATE() >= start_date)
      AND (end_date IS NULL OR CURDATE() <= end_date)
    `,
    [code]
  );

  if (!voucher) {
    throw new Error('Voucher not valid');
  }

  if (voucher.min_order && subtotal < voucher.min_order) {
    throw new Error('Minimum order not reached');
  }

  let discount = 0;

  if (voucher.discount_type === 'percent') {
    discount = subtotal * (voucher.discount_value / 100);

    if (voucher.max_discount && discount > voucher.max_discount) {
      discount = voucher.max_discount;
    }
  } else if (voucher.discount_type === 'fixed') {
    discount = voucher.discount_value;
  }

  if (discount > subtotal) {
    discount = subtotal;
  }

  return {
    voucher_id: voucher.id,
    code: voucher.code,
    discount,
  };
}
