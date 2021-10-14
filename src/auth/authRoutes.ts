import { Router } from 'express';
import { AuthController } from './AuthController';

export const authRoutes = Router();

authRoutes.post('/sign-in', AuthController.signIn);
