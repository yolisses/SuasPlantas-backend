import { Request, Response } from 'express';

import { ChatId } from './Chat';
import { error } from '../utils/error';
import { sendMessage } from './sendMessage';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { findOrCreateChat } from './findOrCreateChat';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { findChat } from './findChat';
import { int } from '../utils/int';

export const ChatController = {
  async chatMessages(req:Request, res:Response) {
    validateAuthenticated(req);
    const { page } = req.query;
    const { id } = req.params;
    const messages = await getChatMessages({
      chatId: int(id),
      page: int(page) || 0,
    });
    res.send(messages);
  },

  async getContacts(req, res) {
    validateAuthenticated(req);
    const { userId } = req.session;
    try {
      const contacts = await getUserChats(userId);
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
