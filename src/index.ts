import './socket/io';
import { PORT } from './config/env';
import { httpServer } from './server/httpServer';
import { startDatabase } from './database/startDatabase';

async function run() {
  await startDatabase();
  httpServer.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`);
  });
}

run();
