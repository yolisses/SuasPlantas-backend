import { Like } from './Like';
import { UserId } from '../../users/User';
import { Plant, PlantId } from '../Plant';
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
