import { createPlant } from './createPlant';
import { getAllPlants } from './getAllPlants';
import { getPlant } from './getPlant';
import { removePlant } from './removePlant';

export const PlantController = {
  async getAll(req, res) {
    const plants = await getAllPlants();
    res.send(plants);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const plant = await getPlant(id);
    res.send(plant);
  },

  async create(req, res) {
    const {
      name, description, price, swap, donate, amount, tags,
    } = req.body;
    const plant = {
      name, description, price, swap, donate, amount, tags,
    };
    res.send(await createPlant(plant));
  },

  async remove(req, res) {
    const { id } = req.params;
    await removePlant(id);
    res.send();
  },
};
