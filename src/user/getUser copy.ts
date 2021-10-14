import { error } from 'utils/error';
import { User } from './User';

export async function getUser(id: number) {
  // const user = await User.findOne(id);
  // if (!user) error(404, 'User not found');
  const users = await User
    .createQueryBuilder('user')
    .where("user.name ilike :name", { name: '%Ulisses%' })
    .getOne()

  console.error(users)
  return users;
}
