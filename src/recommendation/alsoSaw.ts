import { getManager } from 'typeorm';
import { Plant, PlantId } from '../plants/Plant';

export async function alsoSaw(plantId: PlantId):Promise<Plant[]> {
  return getManager().query(`
select rank, id, name, swap, price, card from plant
left join
(select "plantId", count("plantId") as rank from 
 (select distinct view."userId", "plantId" from view
  inner join
 (select distinct "userId" from view where view."plantId" = $1) as vplanta2 
on view."userId" = vplanta2."userId")as coisa group by "plantId") as ranked
on plant.id = ranked."plantId"
order by rank is null, rank desc
limit 24
    `, [plantId]);
}
