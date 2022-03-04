import { isTest } from '../config/env';
import { socket } from '../socket/socket';
import { httpServer } from './httpServer';

export const io = socket(isTest ? httpServer : undefined);
