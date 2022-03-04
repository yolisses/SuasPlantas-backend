import { Request } from 'express';
import { error } from './error';

export function validateAuthenticated(req:Request) {
  if ((req.userId === null) || (req.userId === undefined)) {
    error(403, 'User not authenticated');
  }
}
