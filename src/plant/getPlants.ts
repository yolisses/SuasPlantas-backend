import { Plant } from './Plant';
import { UserId } from '../users/User';
import { paginateResults } from '../common/paginateResults';

interface GetPlantsParams {
  page: number;
  take?: number;
  text?: string;
  radius?:number
  userId?: UserId
  latitude?:number
  longitude?:number
}
export async function getPlants({
  text,
  userId,
  radius,
  latitude,
  longitude,
  page = 0,
  take = 50,
}: GetPlantsParams) {
  const query = Plant
    .createQueryBuilder('plant')
    .leftJoinAndSelect('plant.user', 'user');

  if (userId) {
    query.andWhere({ userId });
  }

  if (latitude && longitude && radius) {
    console.log({ latitude, longitude, radius });
    query.andWhere(
      'ST_DWithin(user.location, ST_Point(:latitude, :longitude), :radius)',
      { radius, latitude, longitude },
    );
  }

  if (text) {
    query.andWhere(
      `to_tsvector('portuguese', plant.name) || 
      to_tsvector('portuguese', plant.description)
      @@ plainto_tsquery('portuguese', :text)`,
      { text },
    );
  }

  const skip = page * take;
  query
    .skip(skip)
    .take(take);

  return paginateResults(query.getManyAndCount(), { page, take });
}
