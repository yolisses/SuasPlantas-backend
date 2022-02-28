import { SessionOptions } from 'express-session';
import { AUTH_SECRET } from './env';
import { oneWeekInMilliseconds } from '../utils/oneWeekInMilliseconds';

export const sessionMaxAge = oneWeekInMilliseconds;

export const sessionConfig:SessionOptions = {
  resave: false,
  secret: AUTH_SECRET,
  saveUninitialized: false,
  cookie: {
    maxAge: sessionMaxAge,
    sameSite: 'none',
    secure: true,
  },
};
