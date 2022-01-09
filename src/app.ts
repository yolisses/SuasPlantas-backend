/* eslint-disable import/first */
import 'reflect-metadata';
import 'regenerator-runtime';

import 'express-async-errors';
import express from 'express';
import { createConnection } from 'typeorm';

import signature from 'cookie-signature';
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
    app.use(corsConfig);
    app.use((req, res, next) => {
      const connectSid = req.header('Authorization');
      if (connectSid) {
        req.headers.cookie = `connect.sid=${connectSid}`;
      }
      next();
    });
    app.use(sessionConfig(connection));
    app.use((req, res, next) => {
      const connectSid = `s:${signature.sign(req.sessionID, AUTH_SECRET)}`;
      res.setHeader('Authorization', connectSid);
      next();
    });
    app.use(express.json());
    app.use(routes);
    app.use(errorMiddleware);

    const port = parseInt(PORT, 10);
    // eslint-disable-next-line no-console
    app.listen(port, () => console.info(`Server running on http://localhost:${port}`));
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
