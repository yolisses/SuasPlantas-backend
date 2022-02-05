import { Point } from 'geojson';
import {
  BaseEntity, Connection, Index, ViewColumn, ViewEntity,
} from 'typeorm';
import { User } from '../users/User';
import { Plant } from './Plant';

@ViewEntity({
  name: 'plants',
  materialized: false,
  expression: (connection:Connection) => connection
    .createQueryBuilder()
    .addSelect('plant.id', 'id')
    .addSelect('plant.card', 'card')
    .addSelect('plant.name', 'name')
    .addSelect('plant.description', 'description')
    .addSelect('user.city', 'city')
    .addSelect('user.state', 'state')
    .addSelect('user.location', 'location')
    .from(Plant, 'plant')
    .leftJoin(User, 'user', 'user.id = plant.userId'),
})
export class PlantView extends BaseEntity {
  @ViewColumn()
    id:string;

  @ViewColumn()
    card:string;

  @Index({ fulltext: true })
  @ViewColumn()
    name:string;

  @Index({ fulltext: true })
  @ViewColumn()
    description?:string;

  @ViewColumn()
    city?:string;

  @ViewColumn()
    state?:string;

  @Index({ spatial: true })
  @ViewColumn()
    location?:Point;
}
