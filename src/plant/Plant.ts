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

    @Column('decimal', { precision: 6, scale: 2, nullable: true })
      price: number;

    @Column({ default: false })
      swap: boolean;

    @Column({ default: false })
      donate: boolean;

    @Column({ nullable: true })
      description?: string;
}
