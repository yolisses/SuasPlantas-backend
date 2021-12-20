/* eslint-disable import/first */
import 'reflect-metadata';
import 'regenerator-runtime';

import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';

import { routes } from './routes';
import { AUTH_SECRET, PORT } from './config/env';
import { dbConfig } from './config/dbConfig';
import { corsConfig } from './config/corsConfig';
import { errorMiddleware } from './errorMiddleware';
import { sessionConfig } from './config/sessionConfig';
import { crossDomainCookiesMiddleware } from './config/crossDomainCookiesMiddleware';

createConnection(dbConfig)
  .then(async (connection) => {
    const app = express();

    // don't change the order unless strictly necessary
    app.use(crossDomainCookiesMiddleware);
    app.use(sessionConfig(connection));
    app.use(corsConfig);
    app.use(cookieParser(AUTH_SECRET));
    app.use(express.json());
    app.use(routes);
    app.use(errorMiddleware);

    const port = parseInt(PORT, 10);
    // eslint-disable-next-line no-console
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
