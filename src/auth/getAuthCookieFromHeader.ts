import { Request, Response, NextFunction } from 'express';

export function getAuthCookieFromHeader(req:Request, res:Response, next:NextFunction) {
  const connectSid = req.header('Authorization');
  console.log({ connectSid });
  if (connectSid) {
    req.headers.cookie = `connect.sid=${connectSid}`;
  }
  next();
}
