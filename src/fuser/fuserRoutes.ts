import { Router } from 'express';
import { FuserController } from './FuserController';

export const fuserRoutes = Router();

fuserRoutes.get('/', FuserController.get);
fuserRoutes.delete('/:id', FuserController.remove);
