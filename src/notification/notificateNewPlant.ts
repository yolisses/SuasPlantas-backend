import { Not } from 'typeorm';
import { Plant } from '../plant/Plant';
import { User } from '../users/User';
import { Notification } from './Notification';

export async function notificateNewPlant(plant :Plant) {
  const { userId, id: entityId } = plant;
  const users = await User.find({ where: { id: Not(userId) } });

  await Promise.all(users.map(
    async (user) => Notification.create({ entityId, userId: user.id }).save(),
  ));
}
