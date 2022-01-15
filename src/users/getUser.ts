import { createQueryBuilder } from 'typeorm';
import { validateFound } from '../utils/validateFound';
import { validateProvided } from '../utils/validateProvided';
import { User } from './User';

export async function getUser(id: number) {
  validateProvided({ id });
  const user = createQueryBuilder(User, 'user')
    .where('user.id = :id', { id })
    .leftJoinAndSelect('user.plants', 'plants')
    .leftJoinAndSelect('user.likedPlants', 'likedPlants')
    .addOrderBy('plants.createdAt', 'DESC')
    .addOrderBy('likedPlants.createdAt', 'DESC')
    .getOne();
  validateFound({ user });
  return user;
}
