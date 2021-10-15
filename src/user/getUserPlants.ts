import { Plant } from "plant/Plant";

export async function getUserPlants(id: number) {
    return Plant.find({
        where: { user: id },
        order: { createdAt: -1 },
        relations: ['images'],
        loadEagerRelations: true,
        loadRelationIds: true
    })
}