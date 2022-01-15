import { Router } from 'express';
import { LookingForController } from './LookingForController';

export const lookingForRoutes = Router();

lookingForRoutes.post('/', LookingForController.create);
