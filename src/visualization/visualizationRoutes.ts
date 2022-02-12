import { Router } from 'express';
import { VisualizationController } from './VisualizationController';

export const visualizationRoutes = Router();

visualizationRoutes.post('/', VisualizationController.addNew);
