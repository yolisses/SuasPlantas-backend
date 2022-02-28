import 'reflect-metadata';
import 'regenerator-runtime';
import 'express-async-errors';

import express from 'express';
import { Connection } from 'typeorm';
import session from 'express-session';
import { TypeormStore } from 'connect-typeorm/out';

import { routes } from './routes';
import { isTest } from './config/env';
import { Session } from './signIn/Session';
import { corsConfig } from './config/corsConfig';
import { errorMiddleware } from './errorMiddleware';
import { sessionConfig } from './config/sessionConfig';
import { getAuthCookieFromHeader } from './auth/getAuthCookieFromHeader';
import { setAuthHeaderFromCookie } from './auth/setAuthHeaderFromCookie';

export function server(connection?:Connection) {
  const app = express();
  app.disable('x-powered-by');
  app.use(corsConfig);
  app.use(express.json());

  app.use(getAuthCookieFromHeader);
  const sessionStore = isTest
    ? undefined
    : new TypeormStore().connect(Session.getRepository());
  app.use(session({ ...sessionConfig, store: sessionStore }));
  app.use(setAuthHeaderFromCookie);

  app.use(routes);

  // last
  app.use(errorMiddleware);
  return app;
}
