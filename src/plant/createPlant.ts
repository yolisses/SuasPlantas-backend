import { Tag } from 'tag/Tag';
import { error } from 'utils/error';
import { generateImageName } from 'upload/generateImageName';
import { PlantImage } from 'image/PlantImage';
import { IPlantInfo } from './PlantInterface';
import { Plant } from './Plant';

interface ICreatePlantDTO extends IPlantInfo{
  imagesCount:number
}

export async function createPlant(plant:ICreatePlantDTO) {
  const { imagesCount } = plant;
  if (!imagesCount) error(400, 'Images count not provided');
  if (imagesCount < 1) error(400, 'Images count smaller than one');
  if (imagesCount > 10) error(400, 'Images count bigger than 10');
  const result = await Plant.create(plant);
  const images = [];

  for (let i = 0; i < imagesCount; i++) {
    images[i] = generateImageName();
  }
  result.images = await Promise.all(
    images.map((image) => PlantImage.create({ uri: image }).save()),
  );

  if (plant.tags) {
    const tags: Tag[] = await Tag.findByIds(plant.tags);
    result.tags = tags;
  }
  await result.save();
  return result;
}
