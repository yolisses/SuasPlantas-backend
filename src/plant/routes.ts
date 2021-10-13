import { Router } from 'express';
import { PlantController } from './PlantController';

export const routes = Router();

routes.get('/', PlantController.getAll);
routes.get('/:id', PlantController.getOne);
routes.post('/', PlantController.create);
routes.delete('/:id', PlantController.remove);
