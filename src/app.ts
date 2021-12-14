/* eslint-disable import/first */
import 'reflect-metadata';
import 'regenerator-runtime';

import cors from 'cors';
import 'express-async-errors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';

import { routes } from './routes';
import { Session } from './signIn/Session';
import { corsOptions } from './corsOptions';
import { dbConfig } from './config/dbConfig';
import { AUTH_SECRET, PORT } from './config/env';
import { errorMiddleware } from './errorMiddleware';
import { oneWeekInMilliseconds } from './utils/oneWeekInMilliseconds';

createConnection(dbConfig)
  .then(async (connection) => {
    // create express app
    const app = express();

    app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: AUTH_SECRET,
      cookie: {
        maxAge: oneWeekInMilliseconds,
      },
      store: new TypeormStore().connect(connection.getRepository(Session)),
    }));
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(routes);
    app.use(errorMiddleware);

    const port = parseInt(PORT, 10);
    // eslint-disable-next-line no-console
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
