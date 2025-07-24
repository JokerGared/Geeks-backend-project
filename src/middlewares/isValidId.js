import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (id) => (req, res, next) => {
  if (!isValidObjectId(req.params[id])) {
    throw createHttpError(400, 'Invalid Id');
  }
  next();
};
