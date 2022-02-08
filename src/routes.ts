import { Router } from 'express';

import { isDev } from './utils/isDev';
import { devRoutes } from './dev/devRoutes';
import { pingRoutes } from './ping/pingRoutes';
import { userRoutes } from './users/userRoutes';
import { plantRoutes } from './plant/plantRoutes';
import { questRoutes } from './quests/questsRoutes';
import { uploadRoutes } from './upload/uploadRoutes';
import { imagesRoutes } from './images/imagesRoutes';
import { feedbackRoutes } from './feedback/FeedBackRoutes';
import { notificationsRoutes } from './notification/notificationsRoutes';

export const routes = Router();

routes.use('/ping', pingRoutes);
routes.use('/users', userRoutes);
routes.use('/quests', questRoutes);
routes.use('/plants', plantRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/images', imagesRoutes);
routes.use('/feedback', feedbackRoutes);
routes.use('/notifications', notificationsRoutes);

if (isDev) {
  routes.use('/dev', devRoutes);
}
