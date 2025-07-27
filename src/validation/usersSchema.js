import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required().max(64),
  password: Joi.string().required().min(8).max(64),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().max(64),
  password: Joi.string().required().min(8).max(64),
});
