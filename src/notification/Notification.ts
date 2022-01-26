import {
  Entity,
  Column,
  Timestamp,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantId } from '../plant/Plant';
import { UserId } from '../users/User';

export type NotificationId = number

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:NotificationId;

    @Column()
      userId:UserId;

    @Column()
      entityId:PlantId;

    @CreateDateColumn()
      createdAt: Timestamp;

    entity?:any;
}
