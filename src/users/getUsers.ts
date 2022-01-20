import { paginateResults } from '../common/paginateResults';
import { User } from './User';

interface GetUserParams{
  page: number;
  take?: number;
  text?: string;
}

export async function getUsers({ page = 0, take = 50, text }:GetUserParams) {
  const query = User.createQueryBuilder('user');

  if (text) {
    query.where(
      `to_tsvector('portuguese', user.name)
      @@ plainto_tsquery('portuguese', :text)`,
      { text },
    );
  }

  return paginateResults(query.getManyAndCount(), { page, take });
}
