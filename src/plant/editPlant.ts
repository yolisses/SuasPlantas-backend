import { Tag } from './tag/Tag';
import { User } from '../users/User';
import { error } from '../utils/error';
import { Image } from '../upload/Image';
import { Plant, PlantId } from './Plant';
import { validTags } from './tag/validTags';
import { validateOwner } from '../utils/validateOwner';

interface IPlantEditDTO {
  id:PlantId
  name: string;
  description: string;
  amount?: number;
  price?: number;
  swap: boolean;
  donate: boolean;
  tags: string[];
  images: string[];
}

function editIfPresent(obj:object, values:object) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    // eslint-disable-next-line no-param-reassign
    if (values[key] !== undefined) { obj[key] = values[key]; }
  }
}

export async function editPlant(plant: IPlantEditDTO, userId: number) {
  const {
    name, description, amount, price, swap, donate, images, id,
  } = plant;

  const result = await Plant.findOneOrFail(id);
  validateOwner({ plant }, userId);

  editIfPresent(result, {
    name, description, amount, price, swap, donate,
  });

  if (!images) error(400, 'Images not provided');

  if (images.length > 0) {
    const card = images[0];
    result.card = card;
  }

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
