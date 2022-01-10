import { QueryFailedError } from 'typeorm';
import { Like } from '../like/Like';
import { UserId } from '../users/User';
import { PlantId } from './Plant';

export async function likePlant(plantId:PlantId, userId:UserId) {
  try {
    await Like.create({ userId, plantId }).save();
  } catch (err) {
    if (!(err instanceof QueryFailedError)) throw err;
  }
}
