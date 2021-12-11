import { User } from './User';

export async function getUserByEmail(email: string) {
  return User.findOne({ email });
}
