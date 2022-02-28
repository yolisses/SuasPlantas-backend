import req from 'supertest';
import { app, server } from '../server';
import { getUser } from './getUser';
import { User } from './User';

it(
  'should return error if user is not authenticated',
  () => req(app).get('/users/me').expect(403),
);

it('should return a user if the userId is valid', async () => {
  const userId = 1;
  const app = server();
  const user = await getUser(userId);
  expect(user).toBeInstanceOf(User);
});
