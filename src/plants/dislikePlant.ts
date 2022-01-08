import { Like } from '../like/Like';
import { UserId } from '../users/User';
import { PlantId } from './Plant';

export async function dislikePlant(plantId:PlantId, userId:UserId) {
  return (await Like.findOneOrFail({ where: { userId, plantId } })).remove();
}
