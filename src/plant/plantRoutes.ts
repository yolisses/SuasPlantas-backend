import { Router } from 'express';
import { PlantController } from './PlantController';
import { authMiddleware } from 'auth/authMiddleware';

export const plantsRoutes = Router();

plantsRoutes.get('/', authMiddleware, PlantController.getAll);
plantsRoutes.get('/:id', PlantController.getOne);
plantsRoutes.post('/', authMiddleware, PlantController.create);
plantsRoutes.delete('/:id', PlantController.remove);
