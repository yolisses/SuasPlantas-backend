import req from 'supertest';
import { User } from './User';
import { app } from '../server';
import { getUser } from './getUser';
import { startDatabase } from '../database/startDatabase';

it(
  'should return error if user is not authenticated',
  () => req(app).get('/users/me').expect(403),
);

it('should return a user when userId is valid', async () => {
  const userId = 1;
  await startDatabase();
  await User.create({ id: 1, name: 'test user', image: 'https://testimage' }).save();
  const user = await getUser(userId);
  expect(user).toBeInstanceOf(User);
});

it('should return undefined when userId is valid', async () => {
  const userId = 9999;
  await startDatabase();
  const user = await getUser(userId);
  expect(user).toBe(undefined);
});
