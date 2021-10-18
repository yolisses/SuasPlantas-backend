import { Tag } from "tag/Tag";
import { Plant, PlantId } from "./Plant";
import { User } from "user/User";
import { validTags } from "data/validTags";
import { error } from "utils/error";

interface IPlantCreationDTO {
  name: string;
  swap: boolean;
  tags: string[];
  price?: number;
  amount?: number;
  donate: boolean;
  description: string;
}

export async function editPlant(
  userId: number,
  plantId: PlantId,
  plant: IPlantCreationDTO
) {
  const { name, description, amount, price, swap, donate } = plant;

  const result = await Plant.findOneOrFail(plantId);

  if (result.userId !== userId) error(403, "Plant edit by unauthorized user");

  // const result = Plant.find({
  //   name,
  //   description,
  //   amount,
  //   price,
  //   swap,
  //   donate,
  // });

  const user = await User.findOneOrFail(userId);
  result.user = user;
  result.city = user.city;
  result.state = user.state;
  result.location = user.location;

  if (plant.tags) {
    const validatedTags = plant.tags.filter((tag) => validTags.has(tag));
    const tags: Tag[] = await Tag.findByIds(validatedTags);
    result.tags = tags;
  }

  return await result.save();
}
