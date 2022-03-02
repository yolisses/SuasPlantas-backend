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

  if (!images) error(400, 'Images not provided');

  const result = Plant.create({
    name,
    swap,
    price,
    amount,
    donate,
    userId,
    description,
    card: images[0],
  });

  const imagesInstances: Image[] = await Promise.all(
    plant.images.map(async (uri) => Image.create({ uri }).save()),
  );
  result.images = imagesInstances;

  return result.save();
}
