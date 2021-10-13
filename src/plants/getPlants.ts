import { Plant } from './Plant';

export async function getPlants() {
  return Plant.find();
}
