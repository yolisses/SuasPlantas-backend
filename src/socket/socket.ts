import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { session } from '../session/session';

export function socket(httpServer?:HttpServer):Server {
  const server = new Server(httpServer);
  server.on('connection', async (socket) => {
    socket.on('ping', (send) => { send('pong'); });
    socket.on('send_message', (message, send) => {
      send('ok');
    });
    socket.on('rooms', (send) => {
      send(Array.from(socket.rooms));
    });
    socket.on('auth', async (token:string, send) => {
      const res:any = {};
      const userId = await session().getUserId(`${token}`);
      if (userId) {
        await socket.join(`${userId}`);
        res.userId = userId;
        res.status = 200;
      } else {
        res.userId = null;
        res.status = 403;
      }
      res.rooms = Array.from(socket.rooms);
      send(res);
    });
  });
  return server;
}
