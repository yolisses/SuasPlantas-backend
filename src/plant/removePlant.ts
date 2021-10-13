import { PlantId } from './PlantInterface';
import { Plant } from './PlantModel';

export function removePlant(id:PlantId) {
  return Plant.delete(id);
}
