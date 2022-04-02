import { client } from './client';
import { Plant } from '../plant/Plant';
import { BASE_URL } from '../config/env';
import { Notification } from './Notification';
import { getUsersLookingForPlant } from './getUsersLookingForPlant';

export async function notificateNewPlant(plant :Plant) {
  const {
    name,
    card,
    id: entityId,
  } = plant;

  const userIds = (await getUsersLookingForPlant(name))
    .filter((value) => value !== plant.userId);

  await Promise.all(userIds.map(
    async (userId) => Notification.create({ entityId, userId }).save(),
  ));

  await client.createNotification({
    big_picture: card,
    url: `${BASE_URL}/plants/${entityId}`,
    headings: { en: `Nova planta: ${name}` },
    include_external_user_ids: userIds.map((id) => `${id}`),
    contents: { en: `Uma nova planta que você pode estar procurando: ${name}` },
  });
}
