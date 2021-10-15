import { Plant } from './Plant';

export async function getPlants({ page }) {
    return Plant.find({ relations: ['images'], loadEagerRelations: true });
}
