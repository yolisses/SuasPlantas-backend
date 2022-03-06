import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

import { io } from './io';
import { session } from '../session/session';
import { saveMessage } from '../chat/saveMessage';
import { corsOrigins } from '../config/corsConfig';

export function socket(httpServer?:HttpServer):Server {
  const server = new Server(httpServer, { cors: { origin: corsOrigins } });
  server.on('connection', async (socket) => {
    socket.on('ping', async (send) => {
      try {
        if (typeof send === 'function') {
          send('pong');
        }
      } catch (err) { console.error(err); }
    });

    socket.on('send_message', async (token, messageData, send) => {
      try {
        const senderId = await session().getUserId(token);
        const { text, userId: receiverId } = messageData;
        const message = await saveMessage({ text, senderId, receiverId });
        io.to(`${message.receiverId}`).emit('receive_message', message);
        if (typeof send === 'function') {
          send(message);
        }
      } catch (err) { console.error(err); }
    });

    socket.on('rooms', async (send) => {
      try {
        if (typeof send === 'function') {
          send(Array.from(socket.rooms));
        }
      } catch (err) { console.error(err); }
    });

    socket.on('auth', async (token:string, send) => {
      try {
        if (typeof send === 'function') {
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
        }
      } catch (err) { console.error(err); }
    });

    socket.on('error', (error) => {
      try {
        console.error('error', error);
      } catch (err) {
        console.error(err);
      }
    });
  });
  return server;
}
