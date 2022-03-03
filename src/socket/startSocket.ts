import { Server } from 'socket.io';
import { createServer } from 'http';
import { PORT_SOCKET } from '../config/env';

export async function startSocket():Promise<Server> {
  const httpServer = createServer();
  const io = new Server(httpServer);
  return new Promise((resolve) => {
    httpServer.listen(PORT_SOCKET, () => {
      io.on('connection', async (socket) => {
        await socket.join('1');
        socket.on('ping', (send) => { send('pong'); });
        socket.on('send_message', (message, send) => {
          send('ok');
        });
        socket.on('rooms', (send) => {
          send(Array.from(socket.rooms));
        });
      });
      resolve(io);
    });
  });
}
