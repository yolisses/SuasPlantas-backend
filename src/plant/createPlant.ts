import { Tag } from 'tag/Tag';
import { IPlant } from './PlantInterface';
import { Plant } from './Plant';

export async function createPlant(plant:IPlant) {
  const result = await Plant.create(plant);
  if (plant.tags) {
    const tags: Tag[] = await Tag.findByIds(plant.tags);
    result.tags = tags;
  }
  await result.save();
  return result;
}
