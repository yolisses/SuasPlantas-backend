import { Router } from 'express';

import { isDev } from './utils/isDev';
import { pingRoutes } from './utils/ping';
import { devRoutes } from './dev/devRoutes';
import { userRoutes } from './users/userRoutes';
import { plantRoutes } from './plant/plantRoutes';
import { questRoutes } from './quests/questsRoutes';
import { uploadRoutes } from './upload/uploadRoutes';
import { feedbackRoutes } from './feedback/FeedBackRoutes';
import { notificationsRoutes } from './notification/notificationsRoutes';
import { previewRoutes } from './preview/previewRoutes';

export const routes = Router();

routes.use('/ping', pingRoutes);
routes.use('/users', userRoutes);
routes.use('/quests', questRoutes);
routes.use('/plants', plantRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/preview', previewRoutes);
routes.use('/feedback', feedbackRoutes);
routes.use('/notifications', notificationsRoutes);

if (isDev) {
  routes.use('/dev', devRoutes);
}
