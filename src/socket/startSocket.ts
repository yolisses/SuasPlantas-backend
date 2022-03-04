import { Server } from 'socket.io';
import { session } from '../session/session';

export function socket():Server {
  const server = new Server();
  server.on('connection', async (socket) => {
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
  return server;
}
