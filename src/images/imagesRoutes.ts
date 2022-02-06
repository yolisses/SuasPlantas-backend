import { Router } from 'express';
import { ImagesController } from './ImagesController';

export const imagesRoutes = Router();

imagesRoutes.get('/suggest', ImagesController.suggest);
