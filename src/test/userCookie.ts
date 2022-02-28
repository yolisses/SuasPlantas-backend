import req from 'supertest';
import Express from 'express';
import session from 'express-session';
import { getConnection } from 'typeorm';
import { TypeormStore } from 'connect-typeorm/out';

import { Session } from '../signIn/Session';
import { sessionConfig } from '../config/sessionConfig';
import { setAuthHeaderFromCookie } from '../auth/setAuthHeaderFromCookie';

export async function userCookie(userId) {
  const app = Express();
  app.use(session({ ...sessionConfig }));
  app.use(setAuthHeaderFromCookie);
  app.get('/', async (req, res) => {
    req.session.userId = userId;
    await res.send();
  });
  const res = await req(app).get('/');
  return res.headers.authorization;
}
