import {
  BaseEntity, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { Plant } from '../plant/Plant';

@Entity()
export class Image extends BaseEntity {
  @PrimaryColumn()
    uri: string;

  @ManyToOne(() => Plant, (plant) => plant.images, { onDelete: 'CASCADE' })
    plant: Plant;
}
