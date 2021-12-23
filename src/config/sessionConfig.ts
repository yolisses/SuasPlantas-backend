import session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { AUTH_SECRET } from './env';
import { oneWeekInMilliseconds } from '../utils/oneWeekInMilliseconds';
import { Session } from '../signIn/Session';

export const sessionMaxAge = oneWeekInMilliseconds;

export const sessionConfig = (connection) => session({
  resave: false,
  secret: AUTH_SECRET,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: sessionMaxAge,
    domain: '.suasplantas.com',
  },
  store: new TypeormStore().connect(connection.getRepository(Session)),
});
