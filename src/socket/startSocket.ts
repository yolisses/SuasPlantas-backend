import { createServer } from 'http';
import { Server } from 'socket.io';

export function startSocket() {
  const httpServer = createServer();
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    socket.on('ping', (callback) => { callback('pong'); });
    socket.on('send_message', (message, callback) => {
      console.log(message);
      callback('ok');
    });
  });
  httpServer.listen(5000);
  return httpServer.address() as string;
}
