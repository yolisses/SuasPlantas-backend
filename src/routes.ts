import { Router } from 'express';

import { routes as plantsRoutes } from 'plant/routes';

export const routes = Router();

routes.use('/plants', plantsRoutes);
