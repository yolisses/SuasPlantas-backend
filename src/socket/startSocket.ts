import { Server } from 'socket.io';
import { createServer } from 'http';
import { PORT_SOCKET } from '../config/env';

export async function startSocket():Promise<Server> {
  const httpServer = createServer();
  const io = new Server(httpServer);
  return new Promise((resolve) => {
    httpServer.listen(PORT_SOCKET, () => {
      io.on('connection', (socket) => {
        socket.on('ping', (cb) => { cb('pong'); });
        socket.on('send_message', (message, callback) => {
          callback('ok');
        });
      });
      resolve(io);
    });
  });
}
