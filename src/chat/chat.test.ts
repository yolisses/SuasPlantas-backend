import req from 'supertest';
import { Message } from './Message';
import { User } from '../users/User';
import { getChatMessages } from './getChatMessages';
import { startDatabase } from '../database/startDatabase';
import { app } from '../app';
import { mockMessages } from './mockMessages';
import { userCookie } from '../test/userCookie';

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

it.only('should return current user chats', async () => {
  const userId = 1;
  const res = await req(app)
    .get('/chat/contacts')
    .set('Authorization', await userCookie(userId));
  console.log(res.body);
});
