import { UserId } from '../users/User';
import { validateOwner } from '../utils/validateOwner';
import { Quest, QuestId } from './Quest';

export async function removeQuest(id:QuestId, userId:UserId) {
  const quest = await Quest.findOneOrFail(id);
  validateOwner({ quest }, userId);
  await quest.softRemove();
}
