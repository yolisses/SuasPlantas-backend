import { NextFunction, Request, Response } from 'express';
import { sessionManager } from './sessionManager';

export function sessionMidleware(req:Request, res:Response, next:NextFunction) {
  if (req.headers.authorization) {
    sessionManager.getUserId(this.token).then((userId) => {
      req.userId = userId;
      next();
    });
  } else {
    next();
  }
}
