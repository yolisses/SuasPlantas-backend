import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';

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
      socket.on('ping', (cb) => { cb('pong'); });
    });
    clientSocket.on('connect', done);
  });
});

afterAll(() => {
  io.close();
  clientSocket.close();
});

test('should receive a message', (done) => {
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

test('should work (with ack)', (done) => {
  clientSocket.emit('ping', (arg) => {
    expect(arg).toBe('pong');
    done();
  });
});
