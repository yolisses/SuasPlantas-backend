import req from 'supertest';
import Express from 'express';
import session from 'express-session';

import { sessionConfig } from '../config/sessionConfig';
import { setAuthHeaderFromCookie } from '../auth/setAuthHeaderFromCookie';
import { getSessionStore } from '../session/getSessionStore';

export async function userCookie(userId) {
  const app = Express();
  app.use(session({ ...sessionConfig, store: getSessionStore() }));
  app.use(setAuthHeaderFromCookie);
  app.get('/', async (req, res) => {
    req.session.userId = userId;
    await res.send();
  });
  const res = await req(app).get('/');
  return res.headers.authorization;
}
