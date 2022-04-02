/* eslint-disable prefer-destructuring */
import { Plant } from './Plant';
import { createImage } from './createImage';

interface IPlantCreationDTO {
  name: string;
  images: string[];
  description: string;
}

export async function createPlant(plant: IPlantCreationDTO, userId: number) {
  const {
    name, description, images,
  } = plant;

  let card;
  let imagesInstances;
  if (images) {
    card = images[0];
    imagesInstances = await Promise.all(
      images.map((uri) => createImage(uri)),
    );
  }

  const result = Plant.create({
    name,
    card,
    userId,
    description,
    images: imagesInstances,
  });

  return result.save();
}
