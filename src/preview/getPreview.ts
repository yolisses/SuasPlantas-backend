import { Preview } from './Preview';
import { User } from '../users/User';
import { validateFound } from '../utils/validateFound';

export async function getPreview(previewCode:string):Promise<User|undefined> {
  const preview = await Preview.findOne(previewCode);
  console.log(preview);
  validateFound({ preview });
  const id = preview.userId;
  const user = await User.findOne({
    where: { id },
    relations: ['plants', 'quests'],
    withDeleted: true,
  });
  if (user.deletedAt) return user;
  return undefined;
}
