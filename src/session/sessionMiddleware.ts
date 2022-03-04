import { NextFunction, Request, Response } from 'express';
import { session } from './session';

export async function sessionMidleware(req:Request, res:Response, next:NextFunction) {
  const token = req.header('Authorization');
  if (token) {
    const userId = await session().getUserId(token);
    req.token = token;
    req.userId = userId;
  }
  next();
}
