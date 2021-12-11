import { Plant, PlantId } from '../Plant';
import { UserId } from '../../user/User';
import { error } from '../../utils/error';
import { Like } from './Like';

export async function giveLikeToItemService(plantId: PlantId, userId: UserId) {
  const plant = await Plant.findOne(plantId);
  if (!plant) error(404, `Plant not found: ${plantId}`);
  const like = await Like.create({
    userId,
    plantId,
  }).save();
  return like;
}
