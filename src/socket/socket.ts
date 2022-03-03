import { Server } from 'http';

export function socket(httpServer:Server) {
  const io = new Server(httpServer);
  io.on('connection', (s) => {
    console.log(s);
  });
  return io;
}
