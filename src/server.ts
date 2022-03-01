import 'reflect-metadata';
import 'regenerator-runtime';
import 'express-async-errors';

import express from 'express';
import session from 'express-session';

import { routes } from './routes';
import { corsConfig } from './config/corsConfig';
import { errorMiddleware } from './errorMiddleware';
import { sessionStore } from './session/sessionStore';
import { sessionConfig } from './config/sessionConfig';
import { getAuthCookieFromHeader } from './auth/getAuthCookieFromHeader';
import { setAuthHeaderFromCookie } from './auth/setAuthHeaderFromCookie';

export function server() {
  const app = express();
  app.disable('x-powered-by');
  app.use(corsConfig);
  app.use(express.json());

  app.use(getAuthCookieFromHeader);
  app.use(session({ ...sessionConfig, store: sessionStore }));
  app.use(setAuthHeaderFromCookie);

  app.use(routes);

  // last
  app.use(errorMiddleware);
  return app;
}
