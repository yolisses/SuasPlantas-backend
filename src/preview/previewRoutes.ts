import { Router } from 'express';
import { PreviewController } from './PreviewController';

export const previewRoutes = Router();

previewRoutes.get('/', PreviewController.get);
previewRoutes.post('/', PreviewController.post);
