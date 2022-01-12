import { createQueryBuilder, getRepository } from 'typeorm';
import { validateFound } from '../utils/validateFound';
import { validateProvided } from '../utils/validateProvided';
import { User } from './User';

export async function getUser(id: number) {
  validateProvided({ id });

  const user = createQueryBuilder(User, 'user')
    .where('user.id = :id', { id })
    .innerJoinAndSelect('user.plants', 'plants')
    .orderBy('plants', 'DESC')
    .getOne();
  validateFound({ user });
  return user;
}
