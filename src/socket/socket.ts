import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { session } from '../session/session';
import { corsOrigins } from '../config/corsConfig';

export function socket(httpServer?:HttpServer):Server {
  const server = new Server(httpServer, { cors: { origin: corsOrigins } });
  server.on('connection', async (socket) => {
    socket.on('ping', (send) => {
      try {
        send('pong');
      } catch (err) {
        console.error(err);
      }
    });

    socket.emit('receive_message', { text: 'hello world' });
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
    socket.on('error', (coisa) => {
      console.log('error', coisa);
    });
  });
  return server;
}
