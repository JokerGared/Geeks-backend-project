import 'dotenv/config';

export const getEnvVar = (name, defaultValue) => {
  const envVar = process.env[name];
  if (envVar) return envVar;
  if (defaultValue) return defaultValue;
  throw new Error(`${name} is not assigned`);
};
