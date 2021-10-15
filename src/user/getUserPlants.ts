import { Plant } from "plant/Plant";

export async function getUserPlants(id: number) {
    return Plant.createQueryBuilder('plant')
        .where('plant.userId = :id', { id })
        .orderBy('plant.createdAt', 'DESC')
        .getMany()
}