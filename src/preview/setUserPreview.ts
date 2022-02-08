import { Preview } from './Preview';
import { UserId, User } from '../users/User';
import { getNewPreviewCode } from './getNewPreviewCode';

export async function setUserPreview(userId: UserId, value:boolean) {
  const repo = User.getRepository();
  const parent = await repo.findOneOrFail(userId, {
    relations: ['plants', 'quests'],
    withDeleted: true,
  });

  if (value) {
    const user = await repo.recover(parent);
    const preview = await Preview.findOne({ userId });
    if (preview)preview.remove();
    return user;
  }

  const user = await repo.softRemove(parent);
  const previewCode = getNewPreviewCode();
  const preview = await Preview.findOne({ userId });
  if (preview) {
    preview.id = previewCode;
    await preview.save();
  } else {
    await Preview
      .create({ userId, id: previewCode })
      .save();
  }
  return user;
}
