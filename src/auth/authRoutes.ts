import { Router } from 'express';
import { AuthController } from './AuthController';

export const userRoutes = Router();

userRoutes.post('/', AuthController.signIn);
