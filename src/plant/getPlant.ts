import { Plant } from './Plant';

export async function getPlant(id: number) {
  return Plant.findOne(id);
}
