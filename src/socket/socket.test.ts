import Client, { Socket } from 'socket.io-client';

import { io } from './io';
import { startSocket } from './startSocket';
import { PORT_SOCKET } from '../config/env';
import { session } from '../session/session';

let clientSocket:Socket;

beforeAll(async () => {
  startSocket();
  clientSocket = Client(`http://localhost:${PORT_SOCKET}`);
});

afterAll(() => {
  io.close();
  clientSocket.close();
});

it('should ping a response', (done) => {
  clientSocket.emit('ping', (res) => {
    expect(res).toBe('pong');
    done();
  });
});

it('should receive a message', (done) => {
  const message = {
    id: 1,
    senderId: 2,
    receiverId: 1,
    text: 'message 1',
    createdAt: Date.now().toString(),
  };
  clientSocket.on('receive_message', (arg) => {
    expect(arg).toMatchObject(message);
    done();
  });
  io.emit('receive_message', message);
});

it('should join the userId room', (done) => {
  const userId = 1;
  session().create(userId).then((token) => {
    clientSocket.emit('auth', token, (rooms) => {
      expect(rooms).toMatchObject({
        userId,
        status: 200,
        rooms: [expect.any(String), `${userId}`],
      });
      done();
    });
  });
});
