import Joi from 'joi';

export const createArticleSchema = Joi.object({
  title: Joi.string().min(3).max(48).required().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title can be up to 48 characters',
    'any.required': 'Title is required',
  }),
  article: Joi.string().min(100).max(4000).required().messages({
    'string.min': 'Article must be at least 100 characters',
    'string.max': 'Article can be up to 4000 characters',
    'any.required': 'Article is required',
  }),
  desc: Joi.string().min(3).max(100).messages({
    'string.min': 'Description must be at least 3 characters',
    'string.max': 'Description can be up to 100 characters',
  }),
});

export const updateArticleSchema = Joi.object({
  title: Joi.string().min(3).max(48).messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title can be up to 48 characters',
  }),
  article: Joi.string().min(100).max(4000).messages({
    'string.min': 'Article must be at least 100 characters',
    'string.max': 'Article can be up to 4000 characters',
  }),
  desc: Joi.string().min(3).max(100).messages({
    'string.min': 'Description must be at least 3 characters',
    'string.max': 'Description can be up to 100 characters',
  }),
});
