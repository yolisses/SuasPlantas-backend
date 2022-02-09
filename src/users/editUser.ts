import { User, UserId } from './User';
import { validateFound } from '../utils/validateFound';
import { editIfNotUndefined } from '../utils/editIfNotUndefined';

interface IUserEditDTO {
  name?: string
  image?:string
  description?: string;
  whatsappNumber?: string;
  instagramUsername?: string;
}

export async function editUser(
  userId: UserId,
  {
    name,
    image,
    description,
    whatsappNumber,
    instagramUsername,
  }: IUserEditDTO,
): Promise<User> {
  const user = await User.findOne(userId);
  validateFound({ user });
  editIfNotUndefined(user, {
    name,
    image,
    description,
    whatsappNumber,
    instagramUsername,
  });
  await user.save();
  return user;
}
