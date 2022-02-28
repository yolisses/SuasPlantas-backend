import req from 'supertest';
import { app } from '../app';
import { User } from './User';
import { getUser } from './getUser';
import { userCookie } from '../test/userCookie';
import { startDatabase } from '../database/startDatabase';

beforeAll(async () => {
  await startDatabase();
  await User.create({ id: 1, name: 'test user 0', image: 'https://testimage' }).save();
});

it(
  'should return error if user is not authenticated',
  () => req(app).get('/users/me').expect(403),
);

it(
  'should return the current user if authenticated',
  async () => {
    const userId = 1;
    return req(app)
      .get('/users/me')
      .then((res) => console.log(res.body));
  },
);

it('should return a user when userId is valid', async () => {
  const userId = 1;
  await User.create({ id: 1, name: 'test user', image: 'https://testimage' }).save();
  const user = await getUser(userId);
  expect(user).toBeInstanceOf(User);
});

it('should return undefined when userId is valid', async () => {
  const userId = 9999;
  const user = await getUser(userId);
  expect(user).toBe(undefined);
});
