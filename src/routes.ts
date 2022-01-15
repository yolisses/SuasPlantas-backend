import { Router } from 'express';

import { pingRoutes } from './utils/ping';
import { userRoutes } from './users/userRoutes';
import { plantsRoutes } from './plants/plantRoutes';
import { uploadRoutes } from './upload/uploadRoutes';
import { feedbackRoutes } from './feedback/FeedBackRoutes';
import { lookingForRoutes } from './lookingFor/lookingForRoutes';

export const routes = Router();

routes.use('/ping', pingRoutes);
routes.use('/users', userRoutes);
routes.use('/plants', plantsRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/feedback', feedbackRoutes);
routes.use('/looking_for', lookingForRoutes);
