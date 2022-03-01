import { Router } from 'express';
import { DevController } from './DevController';

export const devRoutes = Router();

devRoutes.get('/', DevController.get);
devRoutes.get('/login', DevController.devLogin);
