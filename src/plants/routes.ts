import { Router } from 'express';
import { getPlants } from './getPlants';

export const routes = Router();

routes.get('/', getPlants);
