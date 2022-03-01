/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { sendMessage } from './sendMessage';
import { mockMessages } from './mockMessages';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { findOrCreateChat } from './findOrCreateChat';
import { startDatabase } from '../database/startDatabase';
import { Chat } from './Chat';
import { User } from '../users/User';

// const messages = mockMessages;
beforeAll(async () => {
  await startDatabase();
  await Promise.all([1, 2].map(async (id) => User.create({ id, name: `user ${id}`, image: 'image' }).save()));
  await Chat.create({ id: 1, user1: 1, user2: 2 }).save();
  const users = await User.find();
  console.log(users);
});

it('should return chat messages', async () => {
  const res = await getChatMessages({ userIds: [1, 2] });
  expect(res.content).toHaveLength(messages.length);
});

it('should return a chat', async () => {
  const users = [1, 2];
  const chat = await findOrCreateChat(users);
  expect(chat).toBeInstanceOf(Chat);
});

it('should send messages', async () => {
  const users = [1, 2];
  const { id: chatId } = await findOrCreateChat(users);
  for (const message of mockMessages) {
    const { text, senderId } = message;
    await sendMessage({ chatId, text, senderId });
  }
});

it.only('should return user chats', async () => {
  const userId = 1;
  const chats = await getUserChats(userId);
  console.log(chats);
});
