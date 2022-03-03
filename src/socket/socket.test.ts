import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { Message } from '../chat/Message';

describe('my awesome project', () => {
  let io;
  let serverSocket;
  let clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address();
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    const message = {
      id: 1,
      senderId: 2,
      receiverId: 1,
      text: 'hello',
      createdAt: Date.now().toString(),
    };
    serverSocket.emit('new message', message);
  });

  test('should work (with ack)', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hola');
    });
    clientSocket.emit('hi', (arg) => {
      expect(arg).toBe('hola');
      done();
    });
  });
});
