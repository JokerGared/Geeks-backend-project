import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least 2 characters',
    'string.max': 'Username should have at most 32 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().max(64).required().messages({
    'string.max': 'Email should have at most 64 characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least 8 characters',
    'string.max': 'Password should have at most 64 characters',
    'any.required': 'Password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(64).required().messages({
    'string.max': 'Email should have at most 64 characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least 8 characters',
    'string.max': 'Password should have at most 64 characters',
    'any.required': 'Password is required',
  }),
});
