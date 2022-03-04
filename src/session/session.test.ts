import req from 'supertest';
import Server, { Express } from 'express';
import { sessionManager } from './sessionManager';
import { sessionMidleware } from './sessionMiddleware';

let app:Express;

beforeAll(() => {
  app = Server();
  app.use(sessionMidleware);
  app.post('login', async (req, res) => {
    const { userId } = req.body;
    const token = await sessionManager.createSession(userId);
    console.log(token);
    return res.send({ token });
  });
  app.get('me', async (req, res) => {
    const { userId } = req.session;
    return res.send({ userId });
  });
});

it('should return undefined userId', async () => {
  const res = await req(app).get('/me');
  expect(res.body).toMatchObject({});
});

it('should return the current user id', async () => {
  const res1 = await req(app).post('/login').send({ userId: 1 });
  const { token } = res1.body;
  console.log(res1.body);
  // const res = await req(app).get('me').set('Authorization', token);
  // expect(res.body).toMatchObject({});
});
