import { Not } from 'typeorm';
import { client } from './client';
import { User } from '../users/User';
import { Plant } from '../plant/Plant';
import { BASE_URL } from '../config/env';
import { Notification } from './Notification';

export async function notificateNewPlant(plant :Plant) {
  const {
    userId, id: entityId, name, card,
  } = plant;
  const users = await User.find({ where: { id: Not(userId) } });

  await Promise.all(users.map(
    async (user) => Notification.create({ entityId, userId: user.id }).save(),
  ));

  await client.createNotification({
    headings: {
      en: `Nova planta: ${name}`,
    },
    contents: {
      en: `Uma nova planta que você pode estar procurando: ${name}`,
    },
    big_picture: card,
    include_external_user_ids: users.map((user) => `${user.id}`),
    url: `${BASE_URL}/plants/${entityId}`,
  });
}
