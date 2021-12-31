import { Request } from 'express';
import { createPlant } from './createPlant';
import { findPlant } from './findPlant';
import { getPlants } from './getPlants';
import { removePlant } from './removePlant';
import { editPlant } from './editPlant';
import { getPlantsSitemap } from './getPlantsSitemap';

function optionalBoolean(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export const PlantController = {
  async get(req, res) {
    const {
      sell, swap, donate, page, ...rest
    } = req.query;
    const plants = await getPlants({
      sell: optionalBoolean(sell),
      swap: optionalBoolean(swap),
      donate: optionalBoolean(donate),
      page: Number(page) || 0,
      ...rest,
    });
    res.send(plants);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const plant = await findPlant(id);
    res.send(plant);
  },

  async create(req:Request, res) {
    const { userId } = req.session;
    res.send(await createPlant(req.body, userId));
  },

  async edit(req, res) {
    const { userId } = req.session;
    res.send(await editPlant(req.body, userId));
  },

  async remove(req, res) {
    const { id } = req.params;
    const { userId } = req.session;
    await removePlant(id, userId);
    res.send();
  },

  async sitemap(req, res) {
    const result = await getPlantsSitemap();
    console.log(result);
    res.send(result);
  },
};
