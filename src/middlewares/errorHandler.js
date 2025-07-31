import fs from 'node:fs/promises';
import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = async (err, req, res, next) => {
  if (req.file?.path) {
    try {
      await fs.unlink(req.file.path);
    } catch (err) {
      console.error('Failed to delete temp file:', err.message);
    }
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      data: err,
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
