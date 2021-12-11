import { Plant } from 'plant/Plant';
import {
  BaseEntity, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryColumn()
    uri: string;

  @ManyToOne(() => Plant, (plant) => plant.images, { onDelete: 'CASCADE' })
    plant: Plant;
}
