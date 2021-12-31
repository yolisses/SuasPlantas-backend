import { Router } from 'express';
import { PlantController } from './PlantController';

export const plantsRoutes = Router();

plantsRoutes.get('/', PlantController.get);
plantsRoutes.get('/sitemap', PlantController.sitemap);
plantsRoutes.get('/:id', PlantController.getOne);

plantsRoutes.post('/', PlantController.create);
plantsRoutes.delete('/:id', PlantController.remove);
plantsRoutes.patch('/', PlantController.edit);
