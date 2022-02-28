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
    viewed: 'ASC',
    createdAt: 'DESC',
  },
})
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:NotificationId;

    @Column()
      userId:number;

    @Column()
      entityId:number;

    @CreateDateColumn()
      createdAt: Timestamp;

    @Column({ nullable: false, default: false })
      viewed:boolean;

    entity?:any;
}
