import { PORT_SOCKET } from '../config/env';
import { io } from './io';

export function startSocket() {
  io.listen(PORT_SOCKET);
}
