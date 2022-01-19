import { UserId } from '../users/User';
import { validateOwner } from '../utils/validateOwner';
import { Quest, QuestId } from './Quest';

interface EditQuestDTO{
  id:QuestId
  name:string,
}

export async function editQuest({ id, name }:EditQuestDTO, userId:UserId) {
  const quest = await Quest.findOneOrFail(id);
  validateOwner({ quest }, userId);
  quest.name = name;
  await quest.save();
}
