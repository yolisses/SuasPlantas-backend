import session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { AUTH_SECRET } from './env';
import { oneWeekInMilliseconds } from '../utils/oneWeekInMilliseconds';
import { Session } from '../signIn/Session';
import { isDev } from '../utils/isDev';

export const sessionMaxAge = oneWeekInMilliseconds;

export const sessionConfig = (connection) => session({
  resave: false,
  secret: AUTH_SECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: sessionMaxAge,
    sameSite: 'none',
    secure: !isDev,
  },
  store: new TypeormStore().connect(connection.getRepository(Session)),
});
