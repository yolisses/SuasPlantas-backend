import { paginateResults } from '../common/paginateResults';
import { Quest } from './Quest';

interface;

export async function getQuests({}) {
  return paginateResults(Quest.find({}));
}
