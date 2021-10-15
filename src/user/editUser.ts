import { error } from "utils/error";
import { User, UserId } from "./User";

interface IUserCreationDTO {
  name: string;
  description: string;
}

export async function editUser(
  userId: UserId,
  { name, description }: IUserCreationDTO
): Promise<User> {
  const user = await User.findOne(userId);
  if (!user) error(404, "User not found");
  user.name = name;
  user.description = description;
  user.save();
  return user;
}
