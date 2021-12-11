import { validateOwner } from '../utils/validateOwner';
import { Plant, PlantId } from './Plant';

export async function editPlant(
  userId: number,
  plantId: PlantId,
) {
  const plant = await Plant.findOneOrFail(plantId);
  validateOwner({ plant }, userId);
  return plant.save();
}
