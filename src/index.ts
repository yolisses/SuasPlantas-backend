import { server } from './server';
import { PORT } from './config/env';
import { startDatabase } from './database/startDatabase';

async function run() {
  await startDatabase();
  const app = server();
  const port = PORT || 3001;
  app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
}

run();
