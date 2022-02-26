import { Plant } from './Plant';
import { UserId } from '../users/User';

interface GetPlantsParams {
  page: number;
  take?: number;
  text?: string;
  radius?:number
  userId?: UserId;
  position?:[number, number]
}
export async function getPlants({
  text,
  userId,
  radius,
  position,
  page = 0,
  take = 50,
}: GetPlantsParams) {
  const query = Plant
    .createQueryBuilder('plant')
    .leftJoinAndSelect('plant.user', 'user');

  if (userId) {
    query.andWhere({ userId });
  }

  if (position && radius) {
    query.andWhere(
      'ST_DWithin(user.location, ST_Point(:latitude, :longitude), :radius)',
      {
        latitude: position[0],
        longitude: position[1],
        radius,
      },
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

  // return paginateResults(query.getManyAndCount(), { page, take });
  return query.getMany();
}
