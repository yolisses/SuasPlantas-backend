import { Router } from 'express';
import { InteractionsController } from './InteractionsController';

export const interactionRoutes = Router();

interactionRoutes.post('/', InteractionsController.create);
