import { Request, Response } from 'express';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { getChatMessages } from './getChatMessages';
import { getUserContacts } from './getUserContacts';

export const ChatController = {
  async chatMessages(req:Request, res:Response) {
    validateAuthenticated(req);
    const { page } = req.query;
    const { id: userId2 } = req.params;
    const { userId: userId1 } = req.session;
    const plants = await getChatMessages({
      userId1,
      page: parseInt(page as string, 10) || 0,
      userId2: parseInt(userId2 as string, 10) || 0,
    });
    res.send(plants);
  },

  async getContacts(req, res) {
    validateAuthenticated(req);
    const { userId } = req.session;
    try {
      const contacts = await getUserContacts(userId);
      return res.send(contacts);
    } catch (err) {
      console.error(err);
    }
  },
};
