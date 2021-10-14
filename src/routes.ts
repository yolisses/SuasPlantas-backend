import { Router } from 'express';

import { plantsRoutes } from 'plant/plantRoutes';
import { userRoutes } from 'user/userRoutes';
import { authRoutes } from 'auth/authRoutes';

export const routes = Router();

routes.use('/plants', plantsRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);