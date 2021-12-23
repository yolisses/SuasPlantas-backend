/* eslint-disable import/first */
import 'reflect-metadata';
import 'regenerator-runtime';

import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import forceSslHeroku from 'force-ssl-heroku';
import { createConnection } from 'typeorm';

import { routes } from './routes';
import { AUTH_SECRET, PORT } from './config/env';
import { dbConfig } from './config/dbConfig';
import { errorMiddleware } from './errorMiddleware';
import { sessionConfig } from './config/sessionConfig';
import { corsConfig } from './config/corsConfig';

createConnection(dbConfig)
  .then(async (connection) => {
    const app = express();

    // don't change the order unless strictly necessary
    app.use(forceSslHeroku);
    app.use(corsConfig);
    app.use(sessionConfig(connection));
    app.use((req, res, next) => {
      console.log(req.headers.origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      next();
    });
    // heroku https
    app.set('trust proxy', 1);
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
