import { Request, Response } from 'express';

import { int } from '../utils/int';
import { saveMessage } from './saveMessage';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { io } from '../socket/io';

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
    const { userId: senderId } = req;
    const { text, userId: receiverId } = req.body;
    const message = await saveMessage({ text, senderId, receiverId });
    io.to(`${message.receiverId}`).emit('receive_message', message);
    return res.send(message);
  },
};
