import { paginateResults } from '../common/paginateResults';
import { Quest } from './Quest';

interface GetQuestsParams{
  page:number
  take:number
}

export async function getQuests({ page = 0, take = 20 }:GetQuestsParams) {
  const skip = page * take;
  return paginateResults(Quest.findAndCount({ relations: ['user'], take, skip }), { page, take });
}
