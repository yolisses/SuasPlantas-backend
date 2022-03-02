import { Image } from '../upload/Image';
import { Plant, PlantId } from './Plant';
import { validateOwner } from '../utils/validateOwner';
import { editIfNotUndefined } from '../utils/editIfNotUndefined';
import { validateFound } from '../utils/validateFound';

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

export async function editPlant(plant: IPlantEditDTO, userId: number) {
  const {
    name, description, amount, price, swap, donate, images, id,
  } = plant;

  const result = await Plant.findOneOrFail(id);
  validateFound({ plant });
  validateOwner({ plant }, userId);

  editIfNotUndefined(result, {
    name, description, amount, price, swap, donate,
  });

  if (images) {
    const card = images[0];
    result.card = card;

    const imagesInstances: Image[] = await Promise.all(
      plant.images.map(async (uri) => Image.create({ uri }).save()),
    );
    result.images = imagesInstances;
  }

  return result.save();
}
