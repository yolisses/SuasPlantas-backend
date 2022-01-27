import { Request, Response } from 'express';

export const DevController = {
  async get(req:Request, res:Response) {
    res.send(req.query);
  },
};
