import { User } from '../users/User';

export async function getPreview(previewCode:string) {
  if (!previewCode) return;
  return User.findOne({ where: { id: 3 }, relations: ['plants', 'quests'] });
}
