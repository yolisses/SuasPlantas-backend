import { Plant } from './Plant';

export class PlantRepository {
  createPlant(plant:Plant) {
    return Plant.create().save();
  }
}
