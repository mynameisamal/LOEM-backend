import Joi from 'joi';

export const createAddressSchema = Joi.object({
  label: Joi.string().max(50).required(),
  detail_address: Joi.string().required(),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
});

export const updateAddressSchema = Joi.object({
  label: Joi.string().max(50).required(),
  detail_address: Joi.string().required(),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
});
