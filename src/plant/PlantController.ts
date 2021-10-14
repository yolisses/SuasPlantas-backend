import { error } from 'utils/error';
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
    const { images } = req.body;
    if (!images) error(400, 'Images not provided');
    if (images.length < 1) error(400, 'Images length smaller than one');
    if (images.length > 10) error(400, 'Images length bigger than 10');

    res.send(await createPlant(req.body));
  },

  async remove(req, res) {
    const { id } = req.params;
    await removePlant(id);
    res.send();
  },
};
