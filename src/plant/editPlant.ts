import { Tag } from "tag/Tag";
import { Plant, PlantId } from "./Plant";
import { User } from "user/User";
import { validTags } from "data/validTags";

interface IPlantCreationDTO {
  name: string;
  swap: boolean;
  tags: string[];
  price?: number;
  amount?: number;
  donate: boolean;
  plantId: PlantId;
  description: string;
}

export async function editPlant(plant: IPlantCreationDTO, userId: number) {
  const { name, description, amount, price, swap, donate } = plant;

  const result = Plant.find({
    name,
    description,
    amount,
    price,
    swap,
    donate,
  });

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
