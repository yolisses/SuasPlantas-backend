import { Request, Response } from 'express';
import { getNotifications } from './getNotifications';

export const NotificationsController = {
  async get(req:Request, res:Response) {
    const { userId } = req.session;
    const notifications = await getNotifications({ userId, ...req.query });
    return res.send(notifications);
  },
};
