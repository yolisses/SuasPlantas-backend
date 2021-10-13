import * as createError from 'http-errors';
import { Plant } from './PlantModel';

export async function getPlant(id: number) {
  const plant = await Plant.findOne(id);
  return plant;
}
