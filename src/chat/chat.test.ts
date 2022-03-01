/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { User } from '../users/User';
import { mockMessages } from './mockMessages';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { startDatabase } from '../database/startDatabase';
import { findOrCreateChat } from './findOrCreateChat';
import { sendMessage } from './sendMessage';

const messages = mockMessages;

beforeAll(async () => {
  await startDatabase();
  await Promise.all(
    [
      User.create({ id: 1, name: 'Mike', image: 'https://testimage' }).save(),
      User.create({ id: 2, name: 'Tom', image: 'https://testimage' }).save(),
    ],
  );
  // for (const message of messages) {
  //   await Message.create(message).save();
  // }
});

it('should return chat messages', async () => {
  const res = await getChatMessages({ userIds: [1, 2] });
  expect(res.content).toHaveLength(messages.length);
});

it('should return a chat', async () => {
  const users = [1, 2];
  const chat = await findOrCreateChat(users);
  console.log(chat);
});

it.only('should send messages', async () => {
  const users = [1, 2];
  const { id: chatId } = await findOrCreateChat(users);
  console.log(chatId);
  for (const message of mockMessages) {
    const { text, senderId } = message;
    await sendMessage({ chatId, text, senderId });
  }
});

it('should return current user chats', async () => {
  const userId = 1;
  const chats = await getUserChats(userId);
  console.log(chats);
});
