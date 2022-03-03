import { createServer } from 'http';
import { Server } from 'socket.io';

export function startSocket() {
  const httpServer = createServer();
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    socket.on('ping', (cv) => { cv('pong'); });
    console.log('connected');
  });
  httpServer.listen(5000);
  return httpServer.address() as string;
}
