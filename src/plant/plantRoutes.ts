import { Router } from 'express';
import { PlantsController } from './PlantsController';

export const plantRoutes = Router();

plantRoutes.get('/', PlantsController.get);
plantRoutes.get('/sitemap', PlantsController.sitemap);
plantRoutes.get('/:id', PlantsController.getOne);

plantRoutes.post('/', PlantsController.create);
plantRoutes.delete('/:id', PlantsController.remove);
plantRoutes.patch('/', PlantsController.edit);

plantRoutes.post('/:id/like', PlantsController.like);
plantRoutes.delete('/:id/like', PlantsController.dislike);
