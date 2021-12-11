import { error } from '../utils/error';
import { Plant, PlantId } from './Plant';

export async function editPlant(
  userId: number,
  plantId: PlantId,
) {
  const plant = await Plant.findOneOrFail(plantId);

  if (plant.userId !== userId) error(403, 'Plant edit by unauthorized user');

  return await plant.save();
}
