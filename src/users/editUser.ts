import { error } from '../utils/error';
import { User, UserId } from './User';

interface IUserCreationDTO {
  name: string;
  instagramUsername?: string;
  whatsappNumber?: number;
  description: string;
}

export async function editUser(
  userId: UserId,
  {
    name, description, instagramUsername, whatsappNumber,
  }: IUserCreationDTO,
): Promise<User> {
  const user = await User.findOne(userId);
  if (!user) error(404, 'User not found');
  if (name) {
    user.name = name;
  }
  if (description !== undefined) {
    user.description = description;
  }
  if (instagramUsername !== undefined) {
    user.instagramUsername = instagramUsername;
  }
  if (whatsappNumber !== undefined) {
    user.whatsappNumber = whatsappNumber;
  }
  await user.save();
  return user;
}