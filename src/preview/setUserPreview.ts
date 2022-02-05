import { UserId, User } from '../users/User';

export async function setUserPreview(userId: UserId) {
  const repo = User.getRepository();
  const parent = await repo.findOneOrFail(userId, {
    relations: ['plants', 'quests'],
  });
  return repo.softRemove(parent);
}
