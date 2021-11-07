/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import 'reflect-metadata';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import express from 'express';
import { dbConfig } from 'db/dbConfig';
import { errorMiddleware } from './errorMiddleware';
import { routes } from './routes';

createConnection(dbConfig)
  .then(async () => {
    // create express app
    const app = express();
    app.use(express.json());
    app.use(routes);

    app.use(errorMiddleware);

    app.listen(3000, () => console.info('Server running on http://localhost:3000'));
  })
  .catch((error) => console.log(error));
