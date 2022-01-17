import { createQuest } from './createQuest';
import { getQuests } from './getQuests';

export const QuestController = {
  async create(req, res) {
    const { userId } = req.session;
    res.send(await createQuest(req.body, userId));
  },

  async get(req, res) {
    const quests = await getQuests();
    res.send(quests);
  },
};
