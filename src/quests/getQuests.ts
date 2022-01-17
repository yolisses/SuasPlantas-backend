import { Quest } from './Quest';

export async function getQuests() {
  return Quest.find({});
}
