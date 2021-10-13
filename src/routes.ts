import { Router } from 'express';

import { routes as plantsRoutes } from 'plants/routes';

export const routes = Router();

routes.get('/plants', plantsRoutes);
