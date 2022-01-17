import { UserId } from '../users/User';
import { Quest } from './Quest';

interface createQuestDTO{
    name:string,
}

export async function createQuest(data: createQuestDTO, userId:UserId) {
  const quest = Quest.create(data);
  quest.userId = userId;
  return quest.save();
}
