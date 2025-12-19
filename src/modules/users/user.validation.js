import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(8).required(),
});
