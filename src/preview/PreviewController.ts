import { Request, Response } from 'express';

export const PreviewController = {
  async get(req:Request, res:Response) {
    res.send('hello world');
  },
};
