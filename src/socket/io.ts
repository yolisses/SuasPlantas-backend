import { Server } from 'socket.io';
import { startSocket } from './startSocket';

let ioValue:Server;

export function io() {
  if (!ioValue) {
    ioValue = startSocket();
  }
  return ioValue;
}
