/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import req from 'supertest';
import { app } from '../app';
import { User } from '../users/User';
import { mockMessages } from './mockMessages';
import { userCookie } from '../test/userCookie';
import { getChatMessages } from './getChatMessages';
import { startDatabase } from '../database/startDatabase';
import { getUserChats } from './getUserChats';
import { Message } from './Message';

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

it.only('should return current user chats', async () => {
  const userId = 1;
  const chats = await getUserChats(userId);
  console.log(chats);
});
