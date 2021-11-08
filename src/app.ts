/* eslint-disable import/first */
import 'reflect-metadata';
import 'regenerator-runtime';
import dotenv from 'dotenv';

dotenv.config();

import 'express-async-errors';
import { createConnection } from 'typeorm';
import express from 'express';
import { dbConfig } from 'db/dbConfig';
import { corsOptions } from 'corsOptions';
import cors from 'cors';
import { errorMiddleware } from './errorMiddleware';
import { routes } from './routes';

createConnection(dbConfig)
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(routes);

    app.use(errorMiddleware);

    const port = parseInt(process.env.PORT, 10);
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  .catch((error) => console.log(error));
