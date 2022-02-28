import req from 'supertest';
import { Pagination } from '../common/paginateResults';
import { app } from '../server';

it('should return the messages of a chat if the user is part of', () => {
  const userId = 1;
  const otherUserId = 2;
  req(app).get(`/chat/${otherUserId}`).expect(200).then((res) => expect(res.body).toBeInstanceOf(Pagination));
});

it('should return error if the user is part of the chat', () => {});
it('should create a new message', () => {});
it('should receive a new message in realtime', () => {});
