import Joi from 'joi';

export const addItemSchema = Joi.object({
  product_id: Joi.number().required(),
  qty: Joi.number().min(1).required(),
  notes: Joi.string().allow('').optional(),
});

export const updateItemSchema = Joi.object({
  qty: Joi.number().min(1).required(),
  notes: Joi.string().allow('').optional(),
});
