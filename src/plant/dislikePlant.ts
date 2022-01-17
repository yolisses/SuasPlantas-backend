import { getConnection } from 'typeorm';
import { User, UserId } from '../users/User';
import { Plant, PlantId } from './Plant';

export async function dislikePlant(plantId:PlantId, userId:UserId) {
  const user = await User.findOne(userId);
  const plant = await Plant.findOne(plantId);

  return getConnection()
    .createQueryBuilder()
    .relation(User, 'likedPlants')
    .of(user)
    .remove(plant);
}
