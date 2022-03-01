import { Request, Response } from 'express';

import { Message } from './Message';
import { getChatMessages } from './getChatMessages';
import { getUserContacts } from './getUserContacts';
import { sendMessage } from './sendMessage';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { ChatId } from './Chat';
import { findOrCreateChat } from './findOrCreateChat';
import { error } from '../utils/error';

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

  async message(req:Request, res:Response) {
    validateAuthenticated(req);
    const { text, chatId: chatIdParam, userId: receiverId } = req.body;
    const { userId: senderId } = req.session;

    let chatId:ChatId = chatIdParam;
    if (!chatId) {
      if (!receiverId) error(400, 'Nor chatId or userId provided to send message');
      const chat = await findOrCreateChat([senderId, receiverId]);
      chatId = chat.id;
    }
    const message = sendMessage({ text, senderId, chatId });
    return res.send(message);
  },
};
