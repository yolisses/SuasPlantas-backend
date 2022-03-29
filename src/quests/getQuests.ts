import { paginateResults } from '../common/paginateResults';
import { Quest } from './Quest';

interface GetQuestsParams{
  page:number
  take:number
  text?:string
  radius?:number
  latitude?:number
  longitude?:number
}

export async function getQuests({
  text,
  radius,
  latitude,
  longitude,
  page = 0,
  take = 20,
}:GetQuestsParams) {
  const query = Quest.createQueryBuilder('quest')
    .leftJoinAndSelect('quest.user', 'user');

  if (latitude && longitude && radius) {
    query.andWhere(
      'ST_DWithin(user.location, ST_Point(:latitude, :longitude), :radius)',
      { radius: radius * 1000, latitude, longitude },
    );
  }

  if (text) {
    query.where(
      `to_tsvector('portuguese', quest.name)
      @@ plainto_tsquery('portuguese', :text)`,
      { text },
    );
  }

  return paginateResults(query, { page, take });
}
