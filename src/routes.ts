import { Router } from 'express';

import { pingRoutes } from './utils/ping';
import { authRoutes } from './auth/authRoutes';
import { likeRoutes } from './plants/like/likeRoutes';
import { userRoutes } from './user/userRoutes';
import { plantsRoutes } from './plants/plantRoutes';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/ping', pingRoutes);
routes.use('/like', likeRoutes);
routes.use('/users', userRoutes);
routes.use('/plants', plantsRoutes);
