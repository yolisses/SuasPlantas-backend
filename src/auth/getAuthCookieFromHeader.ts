import { Request, Response, NextFunction } from 'express';

export function getAuthCookieFromHeader(req:Request, res:Response, next:NextFunction) {
  const connectSid = req.header('Authorization');
  if (connectSid) {
    req.headers.cookie = `connect.sid=${connectSid}`;
  }
  next();
}
