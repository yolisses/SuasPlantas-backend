import { Like } from './Like';
import { PlantId } from '../Plant';
import { UserId } from '../../users/User';
import { validateFound } from '../../utils/validateFound';
import { validateOwner } from '../../utils/validateOwner';

export async function removeLikeOnPlantService(
  userId: UserId,
  plantId: PlantId,
) {
  const like = await Like.findOne({ where: { userId, plantId } });
  validateFound({ like });
  validateOwner({ like }, userId);
  await like.softRemove();
}
