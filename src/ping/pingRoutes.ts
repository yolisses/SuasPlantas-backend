import { Router } from 'express';
import { PingController } from './PingController';

export const pingRoutes = Router();

pingRoutes.get('/', PingController.ping);
pingRoutes.post('/', PingController.ping);
