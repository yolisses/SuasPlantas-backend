import { Router } from 'express';

import { isDev } from './utils/isDev';
import { devRoutes } from './dev/devRoutes';
import { pingRoutes } from './ping/pingRoutes';
import { chatRoutes } from './chat/chatRoutes';
import { userRoutes } from './users/userRoutes';
import { fuserRoutes } from './fuser/fuserRoutes';
import { plantRoutes } from './plant/plantRoutes';
import { questRoutes } from './quests/questsRoutes';
import { uploadRoutes } from './upload/uploadRoutes';
import { imagesRoutes } from './images/imagesRoutes';
import { feedbackRoutes } from './feedback/FeedBackRoutes';
import { locationRoutes } from './location/locationRoutes';
import { interactionRoutes } from './interaction/interactionRoutes';
import { notificationsRoutes } from './notification/notificationsRoutes';
import { visualizationRoutes } from './visualization/visualizationRoutes';

export const routes = Router();

routes.use('/chat', chatRoutes);
routes.use('/ping', pingRoutes);
routes.use('/users', userRoutes);
routes.use('/fusers', fuserRoutes);
routes.use('/quests', questRoutes);
routes.use('/plants', plantRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/images', imagesRoutes);
routes.use('/feedback', feedbackRoutes);
routes.use('/location', locationRoutes);
routes.use('/interactions', interactionRoutes);
routes.use('/notifications', notificationsRoutes);
routes.use('/visualizations', visualizationRoutes);

if (isDev) {
  routes.use('/dev', devRoutes);
}
