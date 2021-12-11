import { validateFound } from '../utils/validateFound';
import { User } from './User';

export async function getUser(id: number) {
  const user = await User.findOne(id);
  validateFound({ user });
  return user;
}
