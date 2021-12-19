import { Router } from 'express';
import { PlantController } from './PlantController';

export const plantsRoutes = Router();

plantsRoutes.get('/', PlantController.get);
plantsRoutes.get(
  '/image-link',
  PlantController.getImageUploadLink,
);
// Should be after the more specifics
plantsRoutes.get('/:id', PlantController.getOne);
plantsRoutes.post('/', PlantController.create);
plantsRoutes.delete('/:id', PlantController.remove);
plantsRoutes.patch('/:plantId', PlantController.edit);
