import { User, UserId } from '../users/User';
import { validateFound } from '../utils/validateFound';
import { Plant, PlantId } from './Plant';

export async function findPlant(plantId: PlantId, userId:UserId) {
  const plant = await Plant.findOne(plantId, {
    relations: ['user', 'images', 'tags'],
  });
  validateFound({ plant });
  if (userId) {
    const user = await User.findOne(userId, {
      loadRelationIds: { relations: ['likedPlants'] },
    });
    if (user.likedPlants.indexOf(plantId as any) !== -1) {
      plant.liked = true;
    }
  }
  return plant;
}
