import { Router } from 'express';

import { plantsRoutes } from 'plant/plantRoutes';
import { userRoutes } from 'user/userRoutes';
import { authRoutes } from 'auth/authRoutes';
import { ping } from 'misc/ping';

export const routes = Router();

routes.use('/plants', plantsRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

routes.get('/ping', ping);