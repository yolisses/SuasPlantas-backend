import { UserId, User } from '../users/User';

export async function setUserPreview(userId: UserId, value:boolean) {
  const repo = User.getRepository();
  const parent = await repo.findOneOrFail(userId, {
    relations: ['plants', 'quests'],
    withDeleted: true,
  });

  if (value) {
    const user = await repo.recover(parent);
    return user;
  }
  return repo.softRemove(parent);
}
