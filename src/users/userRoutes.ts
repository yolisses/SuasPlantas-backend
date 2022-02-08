import { Router } from 'express';
import { PingController } from '../ping/PingController';
import { UserController } from './UserController';

export const userRoutes = Router();

userRoutes.get('/me/quests', UserController.getQuests);
userRoutes.get('/me', UserController.me);
userRoutes.get('/:id', UserController.getOne);
userRoutes.get('/', UserController.getMany);

userRoutes.post('/by-profile', UserController.createByProfile);
userRoutes.post('/logout', UserController.logout);
userRoutes.post('/ping', PingController.ping);
userRoutes.post('/', UserController.signIn);

userRoutes.patch('/edit-location', UserController.editLocation);
userRoutes.patch('/', UserController.edit);

userRoutes.delete('/', UserController.remove);
