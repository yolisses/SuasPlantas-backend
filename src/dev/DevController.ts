import { Request, Response } from 'express';
import { BASE_URL } from '../config/env';
import { client } from '../notification/client';
import { Quest } from '../quests/Quest';

export const DevController = {
  async get(req:Request, res:Response) {
    const { text } = req.query;

    const name = 'bacaxeira';
    const card = 'teste';
    const entityId = 1;
    await client.createNotification({
      headings: {
        en: `Nova planta: ${name}`,
      },
      contents: {
        en: `Uma nova planta que você pode estar procurando: ${name}`,
      },
      big_picture: card,
      include_external_user_ids: quests.map((quest:Quest) => `${quest.userId}`),
      url: `${BASE_URL}/plants/${entityId}`,
    });
    res.send(quests);
  },
};
