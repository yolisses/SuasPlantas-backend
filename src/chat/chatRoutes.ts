import { Router } from 'express';
import { ChatController } from './ChatController';

export const chatRoutes = Router();

chatRoutes.get('/:id', ChatController.chatMessages);
