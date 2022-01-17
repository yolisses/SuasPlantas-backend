import { Router } from 'express';
import { PlantController } from './PlantController';

export const plantRoutes = Router();

plantRoutes.get('/', PlantController.get);
plantRoutes.get('/sitemap', PlantController.sitemap);
plantRoutes.get('/:id', PlantController.getOne);

plantRoutes.post('/', PlantController.create);
plantRoutes.delete('/:id', PlantController.remove);
plantRoutes.patch('/', PlantController.edit);

plantRoutes.post('/:id/like', PlantController.like);
plantRoutes.delete('/:id/like', PlantController.dislike);
