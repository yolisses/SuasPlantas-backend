import { Router } from 'express';
import { UserController } from './UserController';

export const userRoutes = Router();

userRoutes.get('/me', UserController.me);
userRoutes.patch('/', UserController.edit);
userRoutes.post('/', UserController.signIn);
userRoutes.delete('/', UserController.remove);
userRoutes.get('/:id', UserController.getOne);
userRoutes.get('/:userId/plants', UserController.getPlants);
userRoutes.patch('/edit-location', UserController.editLocation);
