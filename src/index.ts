import { createConnection } from 'typeorm';

import { server } from './server';
import { PORT } from './config/env';
import { dbConfig } from './config/dbConfig';

async function run() {
  const connection = await createConnection(dbConfig);
  const app = server(connection);
  const port = PORT || 3001;
  app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
}

run();
