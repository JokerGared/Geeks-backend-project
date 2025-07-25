import { TEMP_UPLOAD_DIR } from './constants/paths.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

await initMongoConnection();
await createDirIfNotExists(TEMP_UPLOAD_DIR);
setupServer();
