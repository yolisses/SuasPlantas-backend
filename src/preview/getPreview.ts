import { Preview } from './Preview';
import { User } from '../users/User';
import { validateFound } from '../utils/validateFound';
import { mutateUserWithIpInfo } from '../users/mutateUserWithIpInfo';

export async function getPreview(previewCode:string, ip:string):Promise<User|undefined> {
  const preview = await Preview.findOne(previewCode);
  console.log(preview);
  validateFound({ preview });
  const id = preview.userId;
  const user = await User.findOne({
    where: { id },
    relations: ['plants', 'quests'],
    withDeleted: true,
  });

  await mutateUserWithIpInfo(user, ip);
  user.save();
  if (user.deletedAt) return user;
  return undefined;
}
