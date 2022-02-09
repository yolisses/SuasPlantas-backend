import { Tag } from './tag/Tag';
import { Plant } from './Plant';
import { User } from '../users/User';
import { error } from '../utils/error';
import { Image } from '../upload/Image';
import { validTags } from './tag/validTags';

interface IPlantCreationDTO {
  name: string;
  swap: boolean;
  tags: string[];
  price?: number;
  donate: boolean;
  amount?: number;
  images: string[];
  description: string;
}

export async function createPlant(plant: IPlantCreationDTO, userId: number) {
  const {
    name, description, amount, price, swap, donate, images,
  } = plant;

  const result = Plant.create({
    name,
    swap,
    price,
    amount,
    donate,
    description,
  });

  if (!images) error(400, 'Images not provided');

  const card = images[0];
  result.card = card;

  const imagesInstances: Image[] = await Promise.all(
    plant.images.map(async (uri) => {
      const image = Image.create();
      image.uri = uri;
      return image.save();
    }),
  );
  result.images = imagesInstances;

  const user = await User.findOneOrFail(userId);
  result.user = user;

  if (plant.tags) {
    const validatedTags = plant.tags.filter((tag) => validTags.has(tag));
    const tags: Tag[] = await Tag.findByIds(validatedTags);
    result.tags = tags;
  }

  return result.save();
}
