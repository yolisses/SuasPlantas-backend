import { Request, Response } from 'express';

import { int } from '../utils/int';
import { sendMessage } from './sendMessage';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { validateAuthenticated } from '../utils/validateAuthenticated';

export const ChatController = {
  async chatMessages(req:Request, res:Response) {
    validateAuthenticated(req);
    const { page } = req.query;
    const { id } = req.params;
    const { userId } = req;
    const messages = await getChatMessages({
      userIds: [int(id), userId],
      page: int(page) || 0,
    });
    res.send(messages);
  },

  async getContacts(req, res) {
    validateAuthenticated(req);
    const { userId } = req;
    const contacts = await getUserChats(userId);
    return res.send(contacts);
  },

  async message(req:Request, res:Response) {
    validateAuthenticated(req);
    const { userId: senderId } = req.session;
    const { text, userId: receiverId } = req.body;
    const message = sendMessage({ text, senderId, receiverId });
    return res.send(message);
  },
};
