import { UserId, User } from '../users/User';
import { getNewPreviewCode } from './getNewPreviewCode';

export async function setUserPreview(userId: UserId, value:boolean) {
  const repo = User.getRepository();
  const user = await repo.findOneOrFail(userId, {
    relations: ['plants', 'quests'],
    withDeleted: true,
  });

  if (value) {
    user.preview = null;
    await user.save();
    return repo.recover(user);
  }

  user.preview = getNewPreviewCode();
  await user.save();
  return repo.softRemove(user);
}
