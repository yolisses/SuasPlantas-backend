import { createQuest } from './createQuest';
import { editQuest } from './editQuests';
import { getQuests } from './getQuests';
import { removeQuest } from './removeQuests';

export const QuestController = {
  async create(req, res) {
    const { userId } = req.session;
    res.send(await createQuest(req.body, userId));
  },

  async get(req, res) {
    const quests = await getQuests({
      ...req.query,
      page: Number(req.query.page) || 0,
    });
    res.send(quests);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req.session;
    await removeQuest(id, userId);
    res.send();
  },

  async edit(req, res) {
    const { id } = req.params;
    const { userId } = req.session;
    const quest = await editQuest({ ...req.body, id }, userId);
    res.send(quest);
  },
};
