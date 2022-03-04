import req from 'supertest';
import { app } from '../server/app';
import { User } from './User';
import { getUser } from './getUser';
import { startDatabase } from '../database/startDatabase';
import { session } from '../session/session';

const userId = 1;

beforeAll(async () => {
  await startDatabase();
  await User.create({ id: userId, name: 'teste', image: 'https://teste' }).save();
});

it('should return error if user is not authenticated', async () => req(app).get('/users/me').expect(403));

it('should return the current user if authenticated', async () => {
  const res = await req(app)
    .get('/users/me')
    .set('Authorization', await session().create(userId));
  expect(res.body).toHaveProperty('id');
  expect(res.body).toHaveProperty('name');
  expect(res.body).toHaveProperty('image');
});

it('should return a user when userId is valid', async () => {
  const user = await getUser(userId);
  expect(user).toBeInstanceOf(User);
});

it('should return undefined when userId is valid', async () => {
  const user = await getUser(9999);
  expect(user).toBe(undefined);
});
