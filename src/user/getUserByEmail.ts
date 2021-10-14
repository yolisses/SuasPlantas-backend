import { User } from './User';

export async function getUserByEmail(email: string): Promise<User> {
  return await User.findOne({ email });
}
