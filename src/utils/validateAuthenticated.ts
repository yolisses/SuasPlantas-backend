import { Request } from 'express';
import { error } from './error';

export function validateAuthenticated(req:Request) {
  if ((req.session.userId === null) || (req.session.userId === undefined)) {
    error(403, 'User not authenticated');
  }
}
