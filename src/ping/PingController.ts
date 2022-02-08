import { Request, Response } from 'express';

export const PingController = {
  async ping(req:Request, res:Response) {
    const { body, params, query } = req;
    res.send({
      body, params, query, time: new Date(),
    });
  },
};
