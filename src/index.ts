import { server } from './server';
import { PORT } from './config/env';
import { startDatabase } from './database/startDatabase';

async function run() {
  await startDatabase();
  const app = server();
  app.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}`));
}

run();
