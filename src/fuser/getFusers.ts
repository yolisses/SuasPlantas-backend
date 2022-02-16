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
  if (city) {
    query.orWhere({ cityId: city });
  }
  if (state) {
    query
      .innerJoinAndSelect('fuser.city', 'city')
      .orWhere('city.state = :state', { state });
  }

  const skip = page * take;
  query
    .skip(skip)
    .take(take)
    .addSelect('user');

  return paginateResults(query.getManyAndCount(), { page, take });
}
