import Joi from 'joi';

export const validateVoucherSchema = Joi.object({
  code: Joi.string().required(),
  subtotal: Joi.number().min(0).required(),
});
