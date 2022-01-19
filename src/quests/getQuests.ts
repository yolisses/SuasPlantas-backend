import { paginateResults } from '../common/paginateResults';
import { Quest } from './Quest';

interface GetQuestsParams{
  page:number
  take:number
  text?:string
}

export async function getQuests({ page = 0, take = 20, text }:GetQuestsParams) {
  const skip = page * take;

  const query = Quest.createQueryBuilder('quest');

  if (text) {
    query.where(
      `to_tsvector('portuguese', quest.name)
      @@ plainto_tsquery('portuguese', :text)`,
      { text },
    );
  }

  query
    .skip(skip)
    .take(take)
    .leftJoinAndSelect('quest.user', 'user');

  return paginateResults(query.getManyAndCount(), { page, take });
}
