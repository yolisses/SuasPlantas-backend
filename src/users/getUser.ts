import { createQueryBuilder } from 'typeorm';
import { User } from './User';

export async function getUser(id: number) {
  return createQueryBuilder(User, 'user')
    .where('user.id = :id', { id })
    .leftJoinAndSelect('user.plants', 'plants')
    .leftJoinAndSelect('user.likedPlants', 'likedPlants')
    .leftJoinAndSelect('user.quests', 'quests')
    .addOrderBy('plants.createdAt', 'DESC')
    .addOrderBy('likedPlants.createdAt', 'DESC')
    .getOne();
}
