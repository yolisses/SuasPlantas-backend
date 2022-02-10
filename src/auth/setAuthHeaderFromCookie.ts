import {
  Request,
  Response,
  NextFunction,
} from 'express';
import signature from 'cookie-signature';
import { AUTH_SECRET } from '../config/env';

export function setAuthHeaderFromCookie(req:Request, res:Response, next:NextFunction) {
  const connectSid = `s:${signature.sign(req.sessionID, AUTH_SECRET)}`;
  res.setHeader('Authorization', connectSid);
  next();
}
