import { Router } from 'express';

import { pingRoutes } from './utils/ping';
import { likeRoutes } from './plants/like/likeRoutes';
import { userRoutes } from './users/userRoutes';
import { plantsRoutes } from './plants/plantRoutes';
import { uploadRoutes } from './upload/uploadRoutes';

export const routes = Router();

routes.use('/ping', pingRoutes);
routes.use('/like', likeRoutes);
routes.use('/users', userRoutes);
routes.use('/plants', plantsRoutes);
routes.use('/upload', uploadRoutes);
