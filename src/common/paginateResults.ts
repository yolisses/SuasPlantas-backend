interface PaginateResultsParams{
    page:number,
    take:number
}

export async function paginateResults<T>(
  getData:Promise<[T[], number]>,
  { page, take }:PaginateResultsParams,
) {
  const data = await getData;
  const totalPages = Math.ceil(data[1] / take);
  const nextPage = page < totalPages - 1 ? page + 1 : null;
  return {
    pageData: {
      page,
      totalPages,
      totalCount: data[1],
      nextPage,
    },
    content: data[0],
  };
}
