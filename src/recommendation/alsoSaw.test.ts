import { startDatabase } from '../database/startDatabase';
import { Plant } from '../plant/Plant';
import { User } from '../users/User';
import { View } from '../view/View';
import { alsoSaw } from './alsoSaw';

beforeAll(async () => {
  await startDatabase();
  const userRepo = User.getRepository();
  const plantRepo = Plant.getRepository();
  const viewRepo = View.getRepository();

  await Promise.all([
    userRepo.insert({
      id: 1,
      name: 'user 1',
      city: 'city 1',
      state: 'state 1',
      image: 'image 1',
    }),
    userRepo.insert({
      id: 2,
      name: 'user 2',
      city: 'city 2',
      state: 'state 2',
      image: 'image 2',
    }),
    userRepo.insert({
      id: 3,
      name: 'user 3',
      city: 'city 3',
      state: 'state 3',
      image: 'image 3',
    })]);
  await Promise.all([
    plantRepo.insert({ id: 1, userId: 1, name: 'plant 1' }),
    plantRepo.insert({ id: 2, userId: 2, name: 'plant 2' }),
    plantRepo.insert({ id: 3, userId: 3, name: 'plant 3' })]);
  await Promise.all([
    viewRepo.insert({ userId: 1, plantId: 1 }),
    viewRepo.insert({ userId: 2, plantId: 1 }),
    viewRepo.insert({ userId: 2, plantId: 2 }),
    viewRepo.insert({ userId: 3, plantId: 2 }),
  ]);
});

it('should return also saw plants', async () => {
  const plantId = 1;
  const plants = await alsoSaw(plantId);
  expect(plants).toMatchObject(
    [
      {
        rank: '1',
        id: 2,
        name: 'plant 2',
        card: null,
        city: 'city 2',
        state: 'state 2',
      },
    ],
  );
});
