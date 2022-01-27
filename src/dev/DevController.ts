import { Request, Response } from 'express';
import { devSendNotification } from './devSendNotification';

export const DevController = {
  async get(req:Request, res:Response) {
    const notification = await devSendNotification();
    res.send(notification);
  },
};
