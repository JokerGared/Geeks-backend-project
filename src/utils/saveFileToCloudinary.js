import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { envVars } from '../constants/envVars.js';
import createHttpError from 'http-errors';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(envVars.CLOUD_NAME),
  api_key: getEnvVar(envVars.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(envVars.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    console.error(error);
    throw createHttpError(500, 'Failed to upload image to cloudinary!');
  }
};
