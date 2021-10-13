import * as createError from 'http-errors';
import { Plant } from './PlantModel';

export async function getPlant(id: number) {
  const plant = await Plant.findOne(id);
  if (!plant) throw new Error('Plant not found');
  return plant;
}
