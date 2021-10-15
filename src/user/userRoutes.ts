import { Router } from 'express';
import { UserController } from './UserController';

export const userRoutes = Router();

userRoutes.get('/:id', UserController.getOne);
userRoutes.delete('/:id', UserController.remove);
userRoutes.get('/:id/plants', UserController.getPlants);
