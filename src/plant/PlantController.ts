import { createPlant } from './createPlant';
import { getAllPlants } from './getAllPlants';
import { getPlant } from './getPlant';
import { removePlant } from './removePlant';

export const PlantController = {
  async getOne(req, res) {
    const { id } = req.params;
    return getPlant(id);
  },

  async getAll(req, res) {
    return getAllPlants();
  },

  async create(req, res) {
    const { name, description } = req.body;
    const plant = { name, description };
    return createPlant(plant);
  },

  async delete(req, res) {
    const { id } = req.params;
    return removePlant(id);
  },
};
