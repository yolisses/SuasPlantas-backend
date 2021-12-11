import { Router } from 'express';
import { UserController } from './UserController';

export const userRoutes = Router();

userRoutes.post('/', UserController.signIn);
userRoutes.get('/:id', UserController.getOne);
userRoutes.patch('/', UserController.edit);
userRoutes.patch('/edit-location', UserController.editLocation);
userRoutes.delete('/', UserController.remove);
userRoutes.get('/:userId/plants', UserController.getPlants);
