import { User } from './User';

export async function getUserByEmail(email: string):Promise<User|null> {
  return User.findOne({ where: { email }, withDeleted: true });
}
