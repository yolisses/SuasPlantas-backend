import { Like } from '../like/Like';
import { UserId } from '../users/User';
import { validateFound } from '../utils/validateFound';
import { Plant, PlantId } from './Plant';

export async function findPlant(plantId: PlantId, userId:UserId) {
  const plant = await Plant.findOne(plantId, {
    relations: ['user', 'images', 'tags'],
  });
  validateFound({ plant });
  if (userId) {
    const like = await Like.findOne({ where: { plantId, userId } });
    plant.liked = !!like;
  }
  return plant;
}
