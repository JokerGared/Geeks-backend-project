import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createArticleSchema = Joi.object({
  title: Joi.string().min(3).max(48),
  article: Joi.string().min(100).max(4000),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      const [yyyy, mm, dd] = value.split('-').map(Number);
      const date = new Date(value);
      if (
        date.getFullYear() !== yyyy ||
        date.getMonth() + 1 !== mm ||
        date.getDate() !== dd
      ) {
        return helpers.message('Invalid calendar date');
      }

      return value;
    })
    .required()
    .messages({
      'string.pattern.base': 'Date should be in format: YYYY-MM-DD',
    }),
  rate: Joi.boolean().required(),
  ownerId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
  desc: Joi.string().min(3).max(48),
});

export const updateArticleSchema = Joi.object({});
