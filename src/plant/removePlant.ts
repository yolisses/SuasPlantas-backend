import { error } from 'utils/error';
import { PlantId } from './PlantInterface';
import { Plant } from './Plant';

export async function removePlant(id:PlantId) {
  const plant = await Plant.findOne(id);
  if (!plant) error(404, 'Plant not found');
  plant.remove();
}
