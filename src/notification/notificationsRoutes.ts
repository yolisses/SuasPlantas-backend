import { Router } from 'express';
import { NotificationsController } from './notificationController';

export const notificationsRoutes = Router();

notificationsRoutes.get('/', NotificationsController.get);
notificationsRoutes.get('/hash', NotificationsController.hash);
notificationsRoutes.patch('/:id/viewed', NotificationsController.viewed);
