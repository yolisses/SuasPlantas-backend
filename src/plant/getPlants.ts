import { IsNull, Not } from 'typeorm';
import { UserId } from 'user/User';
import { Plant } from './Plant';

interface GetPlantsParams {
  page: number;
  take?: number;
  tags?: string[];
  sell?: boolean;
  text?: string;
  swap?: boolean;
  userId?: UserId;
  donate?: boolean;
}
export async function getPlants({
  tags,
  sell,
  swap,
  text,
  donate,
  userId,
  page = 0,
  take = 20,
}: GetPlantsParams) {
  const query = Plant.createQueryBuilder('plant');

  if (swap || donate || sell) {
    query.where({ swap, donate, price: null });
    if (swap) query.orWhere({ swap });
    if (donate) query.orWhere({ donate });
    if (sell) query.orWhere({ price: Not(IsNull()) });
  }

  if (userId) {
    query.where({ userId });
  }

  if (text) {
    query.where(
      "to_tsvector('portuguese', plant.name) ||"
        + " to_tsvector('portuguese', plant.description)"
        + " @@ to_tsquery('portuguese', :text)",
      { text },
    );
  }

  if (tags && tags.length) {
    query
      .leftJoin('plant.tags', 'tag')
      .leftJoinAndSelect('plant.tags', 'tagSelect')
      .where('tag.name LIKE ANY (:searchQuery)', {
        searchQuery: tags,
      });
  }

  const skip = page * take;
  query
    .skip(skip)
    .take(take)
    .loadRelationIdAndMap('images', 'plant.images')
    .loadRelationIdAndMap('tags', 'plant.tags')
    .addSelect('user')
    .orderBy('plant.createdAt', 'DESC');

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
