import {
  Entity,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  Timestamp,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Plant, PlantId } from '../plant/Plant';
import { User, UserId } from '../users/User';

export type ViewId = number;

@Entity()
export class View extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
    id: ViewId;

  @ManyToOne(() => User, { nullable: false })
    user: User;

  @Column()
    userId:UserId;

  @ManyToOne(() => Plant, { nullable: false })
    plant: Plant;

  @Column()
    plantId:PlantId;

  @CreateDateColumn()
    createdAt: Timestamp;
}
