import { PlantId } from '../plants/Plant';
import { UserId } from '../users/User';
import { View } from './View';

export async function addView(userId:UserId, plantId:PlantId) {
  return View.create({ userId, plantId }).save();
}
