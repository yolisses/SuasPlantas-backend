import 'reflect-metadata';
import 'regenerator-runtime';

import 'express-async-errors';
import express from 'express';
import { createConnection } from 'typeorm';

import { routes } from './routes';
import { PORT } from './config/env';
import { dbConfig } from './config/dbConfig';
import { corsConfig } from './config/corsConfig';
import { errorMiddleware } from './errorMiddleware';
import { sessionConfig } from './config/sessionConfig';
import { getAuthCookieFromHeader } from './auth/getAuthCookieFromHeader';
import { setAuthHeaderFromCookie } from './auth/setAuthHeaderFromCookie';

const app = express();
app.use(corsConfig);
app.use(express.json());

createConnection(dbConfig)
  .then(async (connection) => {
    // don't change the order unless strictly necessary
    app.use(getAuthCookieFromHeader);
    app.use(sessionConfig(connection));
    app.use(setAuthHeaderFromCookie);

    app.use(routes);

    // last
    app.use(errorMiddleware);
    const port = PORT || 3001;
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  .catch((error) => console.error(error));
