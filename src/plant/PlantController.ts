import { createPlant } from './createPlant';
import { getAllPlants } from './getAllPlants';
import { getPlant } from './getPlant';
import { removePlant } from './removePlant';

export const PlantController = {
  async getAll(req, res) {
    const plants = await getAllPlants();
    return res.send(plants);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const plant = await getPlant(id);
    return res.send(plant);
  },

  async create(req, res) {
    const { name, description } = req.body;
    const plant = { name, description };
    return createPlant(plant);
  },

  async remove(req, res) {
    const { id } = req.params;
    return removePlant(id);
  },
};
