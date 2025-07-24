import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';
import { envVars } from '../constants/envVars.js';

export const initMongoConnection = async () => {
  const user = getEnvVar(envVars.MONGODB_USER);
  const password = getEnvVar(envVars.MONGODB_PASSWORD);
  const cluster = getEnvVar(envVars.MONGODB_URL);
  const db = getEnvVar(envVars.MONGODB_DB);
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
