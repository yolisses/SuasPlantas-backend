import { createServer } from 'https';
import { io } from './server/io';
import { PORT } from './config/env';
import { server } from './server/server';
import { startDatabase } from './database/startDatabase';

async function run() {
  await startDatabase();
  const app = server();
  const httpsServer = createServer(app);

  (async () => app.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}`)))();
  (async () => io.listen(httpsServer))();
}

run();
