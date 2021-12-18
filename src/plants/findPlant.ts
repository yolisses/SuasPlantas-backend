import { validateFound } from '../utils/validateFound';
import { Plant, PlantId } from './Plant';

export async function findPlant(id: PlantId) {
  const plant = await Plant.findOne(id, {
    relations: ['user', 'images'],
  });
  validateFound({ plant });
  return plant;
}
