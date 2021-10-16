import { createPlant } from "./createPlant";
import { getAllPlants } from "./getAllPlants";
import { findPlant } from "./findPlant";
import { createPlantImageUpdateLink } from "./getPlantImageUploadLink";
import { getPlants } from "./getPlants";
import { removePlant } from "./removePlant";
import { error } from "utils/error";

function optionalBoolean(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export const PlantController = {
  async get(req, res) {
    const { sell, swap, page } = req.query;
    const plants = await getPlants({
      sell: optionalBoolean(sell),
      swap: optionalBoolean(swap),
      page: Number(page),
    });

    res.send(plants);
  },

  async getAll(req, res) {
    const plants = await getAllPlants();
    res.send(plants);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const plant = await findPlant(id);
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
