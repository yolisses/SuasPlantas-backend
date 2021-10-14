import { error } from 'utils/error';
import { Plant } from './Plant';

export async function getPlant(id: number) {
  const plant = await Plant.findOne(id);
  if (!plant) error(404, 'Plant not found');
  return plant;
}
