import { Plant } from './PlantModel';

export async function getAllPlants() {
  return Plant.find();
}
