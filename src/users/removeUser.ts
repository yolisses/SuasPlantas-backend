import { validateFound } from '../utils/validateFound';
import { User } from './User';

export async function removeUser(id: number) {
  const user = await User.findOne(id);
  validateFound({ user });
  user.softRemove();
}
