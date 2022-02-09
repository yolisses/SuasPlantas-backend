import { User } from '../users/User';
import { mutateUserWithIpInfo } from '../users/mutateUserWithIpInfo';
import { validateFound } from '../utils/validateFound';
import { isBrowser } from '../request/isBroswer';

export async function getUserPreview(preview:string, ip:string, ua:string):Promise<User|undefined> {
  const user = await User.findOne({
    where: { preview },
    relations: ['plants', 'quests'],
    withDeleted: true,
  });
  validateFound({ preview: user });

  if (isBrowser(ua)) {
    await mutateUserWithIpInfo(user, ip);
    await user.save();
  }
  if (user.deletedAt) return user;
  return undefined;
}
