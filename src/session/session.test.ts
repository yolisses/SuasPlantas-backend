import req from 'supertest';
import Server, { Express } from 'express';
import { session } from './reqSession';
import { sessionMidleware } from './sessionMiddleware';

let app:Express;

beforeAll(() => {
  app = Server();
  app.use(sessionMidleware);
  app.get('/me', async (req, res) => {
    const { userId } = req;
    return res.send({ userId: userId || null });
  });
});

it('should return undefined userId', async () => {
  const res = await req(app).get('/me');
  expect(res.body).toMatchObject({ userId: null });
});

it('should return the current user id', async () => {
  const userId = 1;
  const token = await session.create(userId);
  const res = await req(app).get('/me').set('Authorization', token);
  expect(res.body).toMatchObject({ userId: 1 });
});
