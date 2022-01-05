import { User, UserId } from './User';
import { AWS_BUCKET_PATH } from '../config/env';
import { validateFound } from '../utils/validateFound';
import { editIfNotUndefined } from '../utils/editIfNotUndefined';

interface IUserEditDTO {
  name?: string;
  instagramUsername?: string;
  whatsappNumber?: string;
  description?: string;
  image?:string
}

export async function editUser(
  userId: UserId,
  {
    name, description, instagramUsername, whatsappNumber, image: imageKey,
  }: IUserEditDTO,
): Promise<User> {
  const user = await User.findOne(userId);
  validateFound({ user });
  if (name) {
    user.name = name;
  }

  if (imageKey) {
    user.image = `${AWS_BUCKET_PATH}/uploads/${imageKey}`;
  }

  editIfNotUndefined(user, { description, instagramUsername, whatsappNumber });
  await user.save();
  return user;
}
