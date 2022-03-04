import { Request } from 'express';
import { findPlant } from './findPlant';
import { getPlants } from './getPlants';
import { editPlant } from './editPlant';
import { likePlant } from './likePlant';
import { addView } from '../view/addView';
import { createPlant } from './createPlant';
import { removePlant } from './removePlant';
import { dislikePlant } from './dislikePlant';
import { getPlantsSitemap } from './getPlantsSitemap';
import { notificateNewPlant } from '../notification/notificateNewPlant';
import { int } from '../utils/int';

export const PlantsController = {
  async get(req, res) {
    const {
      page, latitude, longitude, radius, ...rest
    } = req.query;
    const plants = await getPlants({
      page: int(page) || 0,
      radius: Number(radius),
      latitude: Number(latitude),
      longitude: Number(longitude),
      ...rest,
    });
    res.send(plants);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const plant = await findPlant(Number(id), userId);
    res.send(plant);
    if (userId) { addView(userId, plant.id); }
  },

  async create(req:Request, res) {
    const { userId } = req;
    const plant = await createPlant(req.body, userId);
    res.send(plant);
    await notificateNewPlant(plant);
  },

  async edit(req, res) {
    const { userId } = req;
    res.send(await editPlant(req.body, userId));
  },

  async remove(req, res) {
    const { id } = req.params;
    const { userId } = req;
    await removePlant(id, userId);
    res.send();
  },

  async sitemap(req, res) {
    const result = await getPlantsSitemap();
    res.send(result);
  },

  async like(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const like = await likePlant(id, userId);
    res.send(like);
  },

  async dislike(req, res) {
    const { id } = req.params;
    const { userId } = req;
    const like = await dislikePlant(id, userId);
    res.send(like);
  },
};
