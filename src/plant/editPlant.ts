import { Tag } from "tag/Tag";
import { Plant, PlantId } from "./Plant";
import { User } from "user/User";
import { validTags } from "data/validTags";
import { error } from "utils/error";

interface IPlantCreationDTO {
  name: string;
  swap: boolean;
  tags: string[];
  price: number;
  amount: number;
  donate: boolean;
  description: string;
}

export async function editPlant(
  userId: number,
  plantId: PlantId,
  { name, description, amount, price, swap, donate }: IPlantCreationDTO
) {
  const plant = await Plant.findOneOrFail(plantId);

  if (plant.userId !== userId) error(403, "Plant edit by unauthorized user");

  return await plant.save();
}
