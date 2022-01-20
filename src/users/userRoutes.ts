import { Router } from 'express';
import { UserController } from './UserController';

export const userRoutes = Router();

userRoutes.get('/me', UserController.me);
userRoutes.get('/me/quests', UserController.getQuests);
userRoutes.get('/:id', UserController.getOne);
userRoutes.get('/', UserController.getMany);

userRoutes.post('/', UserController.signIn);
userRoutes.post('/logout', UserController.logout);

userRoutes.patch('/', UserController.edit);
userRoutes.delete('/', UserController.remove);
userRoutes.patch('/edit-location', UserController.editLocation);
