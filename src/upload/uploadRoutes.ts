import { Router } from 'express';
import { UploadController } from './UploadController';

export const uploadRoutes = Router();

uploadRoutes.get('/', UploadController.imageLink);
