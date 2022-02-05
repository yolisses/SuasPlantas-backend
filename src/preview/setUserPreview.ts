import { UserId, User } from '../users/User';

export async function setUserPreview(userId: UserId, value:boolean) {
  const repo = User.getRepository();
  const parent = await repo.findOneOrFail(userId, {
    relations: ['plants', 'quests'],
    withDeleted: true,
  });

  if (value) {
    return repo.recover(parent);
  }
  return repo.softRemove(parent);
}
