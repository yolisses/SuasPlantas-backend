import { Express } from 'express';
import { UserId } from '../users/User';

export function setUser(app:Express, userId:UserId) {
  app.use((req, res, next) => { req.session.userId = userId; next(); });
  return app;
}
