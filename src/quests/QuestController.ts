import { createQuest } from './createQuest';
import { editQuest } from './editQuests';
import { getQuests } from './getQuests';
import { removeQuest } from './removeQuests';

export const QuestController = {
  async create(req, res) {
    const { userId } = req;
    res.send(await createQuest(req.body, userId));
  },

  async get(req, res) {
    const {
      page, radius, latitude, longitude,
    } = req.query;

    const quests = await getQuests({
      ...req.query,
      page: Number(page) || 0,
      radius: Number(radius),
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
    return res.send(quests);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;
    await removeQuest(id, userId);
    res.send();
  },

  async edit(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const quest = await editQuest({ ...req.body, id }, userId);
    res.send(quest);
  },
};
