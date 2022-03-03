import { Server, Socket } from 'socket.io';
import Client from 'socket.io-client';
import { PORT_SOCKET } from '../config/env';
import { startSocket } from './startSocket';

let io:Server;
let clientSocket:Socket;

beforeAll(async () => {
  io = await startSocket();
  clientSocket = new Client(`http://localhost:${PORT_SOCKET}`);
});

afterAll(() => {
  io.close();
  clientSocket.close();
});

test.skip('should receive a message', (done) => {
  const message = {
    id: 1,
    senderId: 2,
    receiverId: 1,
    text: 'message 1',
    createdAt: Date.now().toString(),
  };
  clientSocket.on('receive message', (arg) => {
    expect(arg).toMatchObject(message);
    done();
  });
  serverSocket.emit('receive message', message);
});

test('should send a message', (done) => {
  const message = {
    receiverId: 1,
    text: 'sent message',
  };
  clientSocket.emit('send_message', message, (res) => {
    expect(res).toBe('ok');
    done();
  });
});

test('should ping a response', (done) => {
  clientSocket.emit('ping', (arg) => {
    expect(arg).toBe('pong');
    done();
  });
});
