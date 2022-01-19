import { Quest } from '../quests/Quest';
import { UserId } from './User';

export async function getUserQuests(userId:UserId) {
  return Quest.find({ where: { userId }, order: { createdAt: 'ASC' } });
}
