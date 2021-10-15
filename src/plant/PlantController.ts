import { getPlantImageUploadLink } from "upload/getPlantImageUploadLink copy";
import { error } from "utils/error";
import { createPlant } from "./createPlant";
import { getAllPlants } from "./getAllPlants";
import { getPlant } from "./getPlant";
import { createPlantImageUpdateLink } from "./getPlantImageUploadLink";
import { getPlants } from "./getPlants";
import { removePlant } from "./removePlant";

export const PlantController = {
  async get(req, res) {
    const { page } = req.query;
    const plants = await getPlants({ page });
    res.send(plants);
  },

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
    const { userId } = req;
    res.send(await createPlant(req.body, userId));
  },

  async remove(req, res) {
    const { id } = req.params;
    await removePlant(id);
    res.send();
  },

  async getImageUploadLink(req, res) {
    const { userId } = req;
    const link = await createPlantImageUpdateLink(userId);
    res.send(link);
  },
};
