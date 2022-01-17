import { alsoSaw } from '../recommendation/alsoSaw';
import { UserId } from '../users/User';
import { isOnArray } from '../utils/isOnArray';
import { validateFound } from '../utils/validateFound';
import { Plant, PlantId } from './Plant';

export async function findPlant(plantId: PlantId, userId?:UserId) {
  const plant = await Plant.findOne(plantId, {
    relations: ['user', 'images', 'tags'],
    loadRelationIds: userId ? {
      relations: ['likedBy'],
    } : undefined,
  });
  validateFound({ plant });

  if (userId && isOnArray(plant.likedBy, userId)) {
    plant.liked = true;
  }

  plant.alsoSaw = await alsoSaw(plantId);
  return plant;
}
