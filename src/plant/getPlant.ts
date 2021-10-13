import { Plant } from './PlantModel';

export async function getPlant(id: number) {
  return Plant.findOne(id);
}
