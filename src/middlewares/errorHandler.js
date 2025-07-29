import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      data: err.message,
    });
  }

  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'MongoDB error',
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong on the server',
    data: err.message,
  });
};
