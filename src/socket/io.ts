import { isTest } from '../config/env';
import { socket } from './socket';
import { httpServer } from '../server/httpServer';

export const io = socket(isTest ? undefined : httpServer);
