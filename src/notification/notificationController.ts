import { Request, Response } from 'express';
import { getNotifications } from './getNotifications';
import { viewNotification } from './viewNotification';

export const NotificationsController = {
  async get(req:Request, res:Response) {
    const { userId } = req.session;
    const notifications = await getNotifications({ userId, ...req.query });
    return res.send(notifications);
  },

  async viewed(req:Request, res:Response) {
    const { id } = req.params;
    const { userId } = req.session;
    const notification = await viewNotification({ id, userId });
    res.send(notification);
  },
};
