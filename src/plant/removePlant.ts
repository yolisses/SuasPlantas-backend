import { UserId } from "user/User";
import { error } from "utils/error";
import { Plant, PlantId } from "./Plant";

export async function removePlant(id: PlantId, userId: UserId) {
  const plant = await Plant.findOne(id);
  if (!plant) error(404, "Plant not found");
  if (plant.userId !== userId) error(403, "Plant remove by unauthorized user");
  plant.softRemove();
}
