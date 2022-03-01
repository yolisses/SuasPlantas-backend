import req from 'supertest';
import { app } from '../app';
import { User } from '../users/User';
import { mockMessages } from './mockMessages';
import { userCookie } from '../test/userCookie';
import { getChatMessages } from './getChatMessages';
import { findOrCreateChat } from './findOrCreateChat';
import { startDatabase } from '../database/startDatabase';

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
  const res = await getChatMessages({ userId1: 1, userId2: 2 });
  expect(res.content).toHaveLength(messages.length);
});

it('should return current user chats', async () => {
  const userId = 1;
  const res = await req(app)
    .get('/chat/contacts')
    .set('Authorization', await userCookie(userId));
});

it.only('should return a chat', async () => {
  const users = [1, 2];
  const chat = await findOrCreateChat(users);
  console.log(chat);
});
