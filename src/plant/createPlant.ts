import { PlantImage } from 'image/PlantImage';
import { Tag } from 'tag/Tag';
import { User } from 'user/User';
import { Plant } from './Plant';

interface IPlantCreationDTO {
  name: string
  description: string
  amount?: number
  price?: number
  swap: boolean
  donate: boolean
  tags: string[]
  images: string[]
}

export async function createPlant(plant: IPlantCreationDTO, userId: number) {
  const { name, description, amount, price, swap, donate } = plant

  const result = Plant.create({ name, description, amount, price, swap, donate });

  const imagesInstances: PlantImage[] = await Promise.all(
    plant.images.map((uri) => {
      const image = PlantImage.create();
      image.uri = uri;
      return image.save();
    }),
  );
  result.images = imagesInstances;

  const user = await User.findOneOrFail(userId)
  result.user = user
  result.city = user.city
  result.state = user.state
  result.location = user.location

  if (plant.tags) {
    const tags: Tag[] = await Tag.findByIds(plant.tags);
    result.tags = tags;
  }

  return result.save();
}
