import { Router } from 'express';
import { giveLikeToPlantController } from './giveLikeToPlantController';
import { removeLikeOnPlantController } from './removeLikeOnPlantController';

export const likeRoutes = Router();

likeRoutes.post('/:plantId', giveLikeToPlantController);
likeRoutes.delete('/:plantId', removeLikeOnPlantController);
