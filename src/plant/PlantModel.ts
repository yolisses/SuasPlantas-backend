import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';
import { IPlant } from './PlantInterface';

@Entity()
export class Plant extends BaseEntity implements IPlant {
    @PrimaryGeneratedColumn({ type: 'int' })
      id: number;

    @Column()
      name: string;

    @Column()
      description: string;
}
