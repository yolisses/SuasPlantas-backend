import { Like } from '../like/Like';
import { UserId } from '../users/User';
import { PlantId } from './Plant';

export async function likePlant(plantId:PlantId, userId:UserId) {
  return Like.create({ userId, plantId }).save();
}
