import express from 'express';

import { Connection } from 'typeorm';
import { routes } from './routes';
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

  if (connection) {
  // don't change the order unless strictly necessary
    app.use(getAuthCookieFromHeader);
    app.use(sessionConfig(connection));
    app.use(setAuthHeaderFromCookie);
  }

  app.use(routes);

  // last
  app.use(errorMiddleware);

  return app;
}

export const app = server();
