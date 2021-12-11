import { Plant, PlantId } from '../Plant';
import { UserId } from '../../users/User';
import { Like } from './Like';
import { validateFound } from '../../utils/validateFound';

export async function giveLikeToItemService(plantId: PlantId, userId: UserId) {
  const plant = await Plant.findOne(plantId);
  validateFound({ plant });
  const like = await Like.create({
    userId,
    plantId,
  }).save();
  return like;
}
