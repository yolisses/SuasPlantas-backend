import { Like } from 'typeorm';
import { paginateResults } from '../common/paginateResults';
import { FUser } from './FUser';

interface GetFusersParams {
  page: number;
  take?: number;
  city?:string
  state?:string
  donate?: boolean;
}
export async function getFusers({
  city,
  state,
  page = 0,
  take = 50,
}: GetFusersParams) {
  const query = FUser.createQueryBuilder('fuser');
  query
    .innerJoinAndSelect('fuser.city', 'city');

  if (state) {
    query.where('city.state = :state', { state });
  }

  if (city) {
    query.where({ cityId: city });
  }

  const skip = page * take;
  query
    .skip(skip)
    .take(take)
    .addSelect('user');

  return paginateResults(query.getManyAndCount(), { page, take });
}
