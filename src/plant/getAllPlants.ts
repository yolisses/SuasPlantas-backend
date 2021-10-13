import { Plant } from './Plant';

export async function getAllPlants() {
  return Plant.find({ relations: ['tags'] });
}
