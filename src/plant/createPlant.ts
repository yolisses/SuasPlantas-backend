import { Image } from '../image/Image';
import { Tag } from '../tag/Tag';
import { createCard } from '../upload/createCard';
import { User } from '../user/User';
import { error } from '../utils/error';
import { validTags } from '../plant/validTags';
import { getUriByKey } from './getUriByKey';
import { Plant } from './Plant';

interface IPlantCreationDTO {
  name: string;
  description: string;
  amount?: number;
  price?: number;
  swap: boolean;
  donate: boolean;
  tags: string[];
  images: string[];
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
  if (images.length < 1) error(400, 'Images length smaller than one');
  if (images.length > 10) error(400, 'Images length bigger than 10');
  const imagesInstances: Image[] = await Promise.all(
    plant.images.map(async (key) => {
      const image = Image.create();
      image.uri = getUriByKey(key.replace('uploads', 'compressed'));
      return await image.save();
    }),
  );
  result.images = imagesInstances;

  await createCard(images[0]);
  const card = getUriByKey(images[0].replace('uploads', 'cards'));
  result.card = card;

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
