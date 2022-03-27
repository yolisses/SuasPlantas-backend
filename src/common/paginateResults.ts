import { SelectQueryBuilder } from 'typeorm';

interface PaginateResultsParams{
    page:number
    take:number
}

export interface Pagination<T> {
  pageData: {
    page:number
    totalPages:number
    totalCount: number
    nextPage:number|null
  };
  content: T[];
}

export async function paginateResults<T>(
  query: SelectQueryBuilder<T>,
  { page, take }:PaginateResultsParams,
):Promise<Pagination<T>> {
  const skip = page * take;
  query.skip(skip).take(take);
  const data = await query.getManyAndCount();
  const [content, totalCount] = data;

  const totalPages = Math.ceil(totalCount / take);
  const nextPage = page < totalPages - 1 ? page + 1 : null;

  return {
    pageData: {
      page,
      nextPage,
      totalPages,
      totalCount,
    },
    content,
  };
}
