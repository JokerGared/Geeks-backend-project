import path from 'node:path';

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
