import { Router } from 'express';
import { LocationController } from './LocationController';

export const locationRoutes = Router();

locationRoutes.get('/', LocationController.get);
