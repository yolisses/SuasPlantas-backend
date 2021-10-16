import { Plant } from "plant/Plant";

const take = 2;
export async function getUserPlants(id: number, page: number) {
  const skip = page * take;

  const data = await Plant.findAndCount({
    take,
    skip,
    where: { user: id },
    order: { createdAt: -1 },
    relations: ["images"],
    loadEagerRelations: true,
    loadRelationIds: true,
  });

  const totalPages = Math.ceil(data[1] / take);
  const nextPage = page < totalPages ? page + 1 : null;
  return {
    page,
    totalPages,
    totalCount: data[1],
    nextPage,
    content: data[0],
  };
}
