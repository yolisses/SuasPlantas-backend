import { Router } from 'express';

import { plantsRoutes } from 'plant/plantRoutes';
import { userRoutes } from 'user/userRoutes';

export const routes = Router();

routes.use('/plants', plantsRoutes);
routes.use('/users', userRoutes);
