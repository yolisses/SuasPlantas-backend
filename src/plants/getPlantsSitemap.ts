import { Plant } from './Plant';

export async function getPlantsSitemap() {
  return Plant.find({ select: ['id', 'updatedAt'] });
}
