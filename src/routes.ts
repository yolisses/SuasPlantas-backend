import { Router } from 'express';

import { pingRoutes } from './utils/ping';
import { userRoutes } from './users/userRoutes';
import { plantRoutes } from './plant/plantRoutes';
import { questRoutes } from './quests/questsRoutes';
import { uploadRoutes } from './upload/uploadRoutes';
import { feedbackRoutes } from './feedback/FeedBackRoutes';
import { notificationsRoutes } from './notification/notificationsRoutes';

export const routes = Router();

routes.use('/ping', pingRoutes);
routes.use('/users', userRoutes);
routes.use('/quests', questRoutes);
routes.use('/plants', plantRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/feedback', feedbackRoutes);
routes.use('/notifications', notificationsRoutes);
