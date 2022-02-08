import { User } from './User';

export async function createUserByProfile({ name, image }:{name:string, image:string}) {
  const user = await User.create({
    name,
    image,
  }).save();
  return user.softRemove();
}
