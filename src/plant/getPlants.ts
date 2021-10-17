import { PlantImage } from "image/PlantImage";
import { Plant } from "./Plant";

interface GetPlantsParams {
  page: number;
  sell?: boolean;
  swap?: boolean;
  donate?: boolean;
}
const take = 1000;
export async function getPlants({ page, swap, donate }: GetPlantsParams) {
  const query = Plant.createQueryBuilder("plant");

  if (swap || donate) {
    query.where({ swap, donate });
    if (swap) query.orWhere({ swap });
    if (donate) query.orWhere({ donate });
  }

  const skip = page * take;
  query
    .skip(skip)
    .take(take)
    .loadRelationIdAndMap("images", "plant.images")
    .loadRelationIdAndMap("tags", "plant.tags")
    .addSelect("user")
    .orderBy("plant.createdAt", "DESC");

  const data = await query.getManyAndCount();

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
