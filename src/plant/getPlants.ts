import { error } from 'utils/error';
import { Plant } from './Plant';


const take = 2
export async function getPlants({ page: pageParam }) {
    const page = Number(pageParam)
    if (!pageParam) error(400, 'Plants page not provided')
    const skip = page * take

    const data = await Plant.findAndCount({
        take,
        skip,
        order: { createdAt: -1 },
        relations: ['images'],
        loadEagerRelations: true,
        loadRelationIds: true
    });

    const totalPages = Math.ceil(data[1] / take)
    const nextPage = page < totalPages ? page + 1 : null
    return {
        pageParam,
        page,
        totalPages,
        totalCount: data[1],
        nextPage,
        content: data[0]
    }
}
