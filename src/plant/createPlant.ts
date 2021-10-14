import { PlantImage } from 'image/PlantImage';
import { Tag } from 'tag/Tag';
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

export async function createPlant(plant: IPlantCreationDTO) {
  const { name, description, amount, price, swap, donate, tags, images } = plant

  const result = Plant.create({ name, description, amount, price, swap, donate });

  const imagesInstances: PlantImage[] = await Promise.all(
    plant.images.map((uri) => {
      const image = PlantImage.create();
      image.uri = uri;
      return image.save();
    }),
  );
  result.images = imagesInstances;

  if (plant.tags) {
    const tags: Tag[] = await Tag.findByIds(plant.tags);
    result.tags = tags;
  }

  return result.save();
}
