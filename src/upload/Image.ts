import {
  BaseEntity, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { Plant } from '../plants/Plant';

@Entity()
export class Image extends BaseEntity {
  @PrimaryColumn()
    uri: string;

  @ManyToOne(() => Plant, (plant) => plant.images, { onDelete: 'CASCADE' })
    plant: Plant;
}
