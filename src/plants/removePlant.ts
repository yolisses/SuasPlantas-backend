import { UserId } from '../users/User';
import { validateFound } from '../utils/validateFound';
import { validateOwner } from '../utils/validateOwner';
import { Plant, PlantId } from './Plant';

export async function removePlant(id: PlantId, userId: UserId) {
  const plant = await Plant.findOne(id);
  validateFound(plant);
  validateOwner({ plant }, userId);
  await plant.softRemove();
}
