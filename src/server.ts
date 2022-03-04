import 'reflect-metadata';
import 'regenerator-runtime';
import 'express-async-errors';

import express from 'express';

import { routes } from './routes';
import { corsConfig } from './config/corsConfig';
import { errorMiddleware } from './errorMiddleware';
import { sessionMidleware } from './session/sessionMiddleware';

export function server() {
  const app = express();
  app.disable('x-powered-by');
  app.use(corsConfig);
  app.use(express.json());

  app.use(sessionMidleware);

  app.use(routes);

  // last
  app.use(errorMiddleware);
  return app;
}
