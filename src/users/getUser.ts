import { validateFound } from '../utils/validateFound';
import { validateProvided } from '../utils/validateProvided';
import { User } from './User';

export async function getUser(id: number) {
  validateProvided({ id });
  const user = await User.findOne(id, { relations: ['plants', 'likedPlants'] });
  validateFound({ user });
  return user;
}
