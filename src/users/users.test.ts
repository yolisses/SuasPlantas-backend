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

it.only(
  'should return the current user if authenticated',
  async () => {
    const userId = 1;
    const res = await req(app)
      .get('/users/me')
      .set('Authorization', await userCookie(userId));
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('image');
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
