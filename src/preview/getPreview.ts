import { User } from '../users/User';
import { mutateUserWithIpInfo } from '../users/mutateUserWithIpInfo';
import { validateFound } from '../utils/validateFound';

export async function getUserPreview(preview:string, ip:string):Promise<User|undefined> {
  const user = await User.findOne({
    where: { preview },
    relations: ['plants', 'quests'],
    withDeleted: true,
  });
  validateFound({ preview: user });

  await mutateUserWithIpInfo(user, ip);
  user.save();
  if (user.deletedAt) return user;
  return undefined;
}
