import { error } from 'utils/error';
import { User } from './User';

export async function getUser(id: number) {
  const user = await User.findOne(id);
  if (!user) error(404, 'User not found');
  return user;
}