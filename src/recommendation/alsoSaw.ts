import { getManager } from 'typeorm';
import { Plant, PlantId } from '../plant/Plant';

export async function alsoSaw(plantId: PlantId):Promise<Plant[]> {
  return getManager().query(`
select rank, id, name, swap, price, card from plant
left join
(select plant_id, count(plant_id) as rank from 
 (select distinct view.user_id, plant_id from view
  inner join
 (select distinct user_id from view where view.plant_id = $1) as vplanta2 
on view.user_id = vplanta2.user_id)as coisa group by plant_id) as ranked
on plant.id = ranked.plant_id
order by rank is null, rank desc
limit 14
    `, [plantId]);
}
