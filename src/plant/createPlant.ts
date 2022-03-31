/* eslint-disable prefer-destructuring */
import { Plant } from './Plant';
import { error } from '../utils/error';
import { Image } from '../upload/Image';
import { createImage } from './createImage';

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
    swap,
    card,
    price,
    amount,
    donate,
    userId,
    description,
    images: imagesInstances,
  });

  return result.save();
}
