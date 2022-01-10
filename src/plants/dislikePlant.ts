import { EntityNotFoundError } from 'typeorm';
import { Like } from '../like/Like';
import { UserId } from '../users/User';
import { PlantId } from './Plant';

export async function dislikePlant(plantId:PlantId, userId:UserId) {
  try {
    (await Like.findOneOrFail({ where: { userId, plantId } })).remove();
  } catch (err) {
    if (!(err instanceof EntityNotFoundError)) throw err;
  }
}
