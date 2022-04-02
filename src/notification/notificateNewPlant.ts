import { client } from './client';
import { Plant } from '../plant/Plant';
import { BASE_URL } from '../config/env';
import { Notification } from './Notification';

export async function notificateNewPlant(plant :Plant) {
  const {
    name,
    card,
    userId,
    id: entityId,
  } = plant;

  const query = Quest.createQueryBuilder('quest');
  query.select('quest.userId');
  query.where(
    `to_tsvector('portuguese', quest.name)
    @@ plainto_tsquery('portuguese', :text)
    and
    quest.userId != :userId
    `,
    { text: name, userId },
  );
  const quests = await query.getMany();
  const userIds = quests.map((quest:Quest) => quest.userId);

  await Promise.all(userIds.map(
    async (id) => Notification.create({ entityId, userId: id }).save(),
  ));

  await client.createNotification({
    headings: {
      en: `Nova planta: ${name}`,
    },
    contents: {
      en: `Uma nova planta que você pode estar procurando: ${name}`,
    },
    big_picture: card,
    include_external_user_ids: userIds.map((id) => `${id}`),
    url: `${BASE_URL}/plants/${entityId}`,
  });
}
