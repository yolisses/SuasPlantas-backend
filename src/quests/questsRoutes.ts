import { Router } from 'express';
import { QuestController } from './QuestController';

export const questRoutes = Router();

questRoutes.get('/', QuestController.get);
questRoutes.post('/', QuestController.create);
