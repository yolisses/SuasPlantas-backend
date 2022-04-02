import { Plant } from '../plant/Plant';

export async function getUsersLookingForPlant(name:string) {
  const query = Plant.createQueryBuilder('plant');
  query.select('plant.userId');
  query.where('plant.quest = true');
  query.andWhere(
    "to_tsvector('portuguese', plant.name) @@ plainto_tsquery('portuguese', :name)",
    { name },
  );
  const quests = await query.getMany();
  const userIds = quests.map((plant) => plant.userId);
  return userIds;
}
