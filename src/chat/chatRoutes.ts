import { Router } from 'express';
import { ChatController } from './ChatController';

export const chatRoutes = Router();

chatRoutes.get('/contacts', ChatController.getContacts);
chatRoutes.get('/:id', ChatController.chatMessages);

chatRoutes.post('/', ChatController.message);
