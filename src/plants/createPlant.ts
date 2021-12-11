// Responsibilities
// create and save a plant
// use the compressed images instead of uploaded ones
// call card image creation
// set current user as owner
// set location

import { getPoint } from '../location/getPoint';
import { getLocationByIp } from '../location/getLocationByIp';
import { Plant } from './Plant';
import { PlantInput } from './PlantInput';
import { UserId } from '../users/User';

export async function createPlant(plantInput:PlantInput, userId:UserId) {
  const {
    state, city, latitude, longitude,
  } = await getLocationByIp('oie');
  const location = getPoint({ latitude, longitude });
  return Plant.create({
    ...plantInput, state, city, location, tags: [], images: [], card: 'massa.png',
  }).save();
}
