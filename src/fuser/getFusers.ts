import { FUser } from './FUser';
import { paginateResults } from '../common/paginateResults';

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

  if (state) query.where('city.state = :state', { state });
  if (city) query.where({ cityId: city });

  query.addSelect('user');

  return paginateResults(query, { page, take });
}
