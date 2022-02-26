import { paginateResults } from '../common/paginateResults';
import { User } from './User';

interface GetUserParams{
  page: number
  take?: number
  text?: string
  radius?:number
  latitude?:number
  longitude?:number
}

export async function getUsers({
  text,
  radius,
  latitude,
  longitude,
  page = 0,
  take = 50,
}:GetUserParams) {
  const query = User.createQueryBuilder('user');

  if (latitude && longitude && radius) {
    query.andWhere(
      'ST_DWithin(user.location, ST_Point(:latitude, :longitude), :radius)',
      { radius: radius * 1000, latitude, longitude },
    );
  }

  if (text) {
    query.where(
      `to_tsvector('portuguese', user.name)
      @@ plainto_tsquery('portuguese', :text)`,
      { text },
    );
  }

  return paginateResults(query.getManyAndCount(), { page, take });
}
