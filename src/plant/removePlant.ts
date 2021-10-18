import { error } from "utils/error";
import { Plant, PlantId } from "./Plant";

export async function removePlant(id: PlantId) {
  const plant = await Plant.findOne(id);
  if (!plant) error(404, "Plant not found");
  plant.softRemove();
}
