import { createConnection } from 'typeorm';

import { dbConfig } from './config/dbConfig';
import { server } from './server';
import { PORT } from './config/env';

createConnection(dbConfig)
  .then(async (connection) => {
    const app = server(connection);
    const port = PORT || 3001;
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  .catch((error) => console.error(error));
