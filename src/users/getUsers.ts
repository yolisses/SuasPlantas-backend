import { paginateResults } from '../common/paginateResults';
import { User } from './User';

interface GetUserParams{
  page: number
  take?: number
  text?: string
  radius?:number
  latitude?:number
  longitude?:number
  profileRelations?:boolean
}

export async function getUsers({
  text,
  radius,
  latitude,
  longitude,
  profileRelations,
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

  if (profileRelations) {
    query
      .leftJoinAndSelect('user.plants', 'plants')
      .leftJoinAndSelect('user.likedPlants', 'likedPlants')
      .addOrderBy('plants.createdAt', 'DESC')
      .addOrderBy('likedPlants.createdAt', 'DESC');
  }

  return paginateResults(query, { page, take });
}
