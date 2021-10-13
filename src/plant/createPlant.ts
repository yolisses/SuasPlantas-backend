import { IPlant } from './PlantInterface';
import { Plant } from './PlantModel';

export async function createPlant(plant:IPlant) {
  const result = await Plant.create(plant);
  await result.save();
  return result;
}
