import { FindConditions } from "typeorm";
import { Plant } from "./Plant";

interface GetPlantsParams {
  page: number;
  sell?: boolean;
  swap?: boolean;
}
const take = 2;
export async function getPlants({ page, sell, swap }: GetPlantsParams) {
  const skip = page * take;

  const where: FindConditions<Plant> = {};

  const data = await Plant.findAndCount({
    take,
    skip,
    where,
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
