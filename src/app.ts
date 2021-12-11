/* eslint-disable import/first */
import 'reflect-metadata';
import 'regenerator-runtime';

import 'express-async-errors';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import { corsOptions } from './corsOptions';
import { dbConfig } from './db/dbConfig';
import { errorMiddleware } from './errorMiddleware';
import { routes } from './routes';
import { PORT } from './env/env';

createConnection(dbConfig)
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(routes);

    app.use(errorMiddleware);

    const port = parseInt(PORT, 10);
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  .catch((error) => console.log(error));
