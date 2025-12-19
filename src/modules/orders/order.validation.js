import Joi from 'joi';

export const createOrderSchema = Joi.object({
  address_id: Joi.number().required(),
  voucher_code: Joi.string().optional().allow(null, ''),
});
