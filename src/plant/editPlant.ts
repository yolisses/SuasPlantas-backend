import { Image } from '../upload/Image';
import { Plant, PlantId } from './Plant';
import { validateOwner } from '../utils/validateOwner';
import { validateFound } from '../utils/validateFound';
import { editIfNotUndefined } from '../utils/editIfNotUndefined';

interface IPlantEditDTO {
  id:PlantId
  name: string;
  quest:boolean;
  images: string[];
  description: string;
}

export async function editPlant(plant: IPlantEditDTO, userId: number) {
  const {
    id,
    name,
    quest,
    images,
    description,
  } = plant;

  const result = await Plant.findOneOrFail(id);
  validateFound({ plant });
  validateOwner({ plant }, userId);

  editIfNotUndefined(result, { name, description, quest });

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
