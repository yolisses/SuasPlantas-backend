import { Server } from 'socket.io';
import { createServer } from 'http';
import { session } from '../session/session';

export function startSocket():Server {
  const httpServer = createServer();
  const io = new Server(httpServer);
  io.on('connection', async (socket) => {
    socket.on('ping', (send) => { send('pong'); });
    socket.on('send_message', (message, send) => {
      send('ok');
    });
    socket.on('rooms', (send) => {
      send(Array.from(socket.rooms));
    });
    socket.on('auth', async (token:string, send) => {
      const userId = await session().getUserId(token);
      if (userId) {
        await socket.join(`${userId}`);
      }
      send(Array.from(socket.rooms));
    });
  });
  return io;
}
