import { IPlant } from './PlantInterface';
import { Plant } from './PlantModel';

export function createPlant(plant:IPlant) {
  return Plant.create(plant);
}
