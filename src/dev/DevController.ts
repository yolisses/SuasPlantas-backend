import { Request, Response } from 'express';

export const DevController = {
  async get(req:Request, res:Response) {
    res.send(req.query);
  },

  async devLogin(req:Request, res:Response) {
    const { userId } = req.body;
    req.session.userId = userId;
    res.send();
  },
};
