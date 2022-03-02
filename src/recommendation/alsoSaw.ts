import { getManager } from 'typeorm';
import { Plant, PlantId } from '../plant/Plant';

export async function alsoSaw(plantId: PlantId):Promise<Plant[]> {
  return getManager().query(`
SELECT
    rank,
    id,
    name,
    card,
    city,
    state
FROM
    plants plant
    LEFT JOIN (
        SELECT
            plant_id,
            count(plant_id) AS rank
        FROM
            (
                SELECT
                    DISTINCT VIEW.user_id,
                    plant_id
                FROM
                    VIEW
                    INNER JOIN (
                        SELECT
                            DISTINCT user_id
                        FROM
                            VIEW
                        WHERE
                            VIEW.plant_id = $1
                    ) AS vplanta2 ON VIEW.user_id = vplanta2.user_id
            ) AS coisa
        GROUP BY
            plant_id
    ) AS ranked ON plant.id = ranked.plant_id
ORDER BY
    rank IS NULL,
    rank DESC
LIMIT
    14
`, [plantId]);
}
