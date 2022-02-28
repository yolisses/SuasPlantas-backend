import { startDatabase } from '../database/startDatabase';
import { User } from '../users/User';
import { getChatMessages } from './getChatMessages';
import { Message } from './Message';

beforeAll(async () => {
  await startDatabase();
  await User.create({ id: 1, name: 'test user 0', image: 'https://testimage' }).save();
  await User.create({ id: 2, name: 'test user 1', image: 'https://testimage' }).save();
  await Message.create({ text: 'hello', ownerId: 1, receiverId: 2 }).save();
});

it('should return chat messages', async () => {
  const messages = await getChatMessages({ userId1: 1, userId2: 2 });
  expect(messages.content).toHaveLength(1);
});
