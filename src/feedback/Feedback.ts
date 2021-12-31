import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Timestamp,
  ManyToOne,
} from 'typeorm';
import { User, UserId } from '../users/User';

export type FeedbackId = number;

@Entity()
export class Feedback extends BaseEntity {
@PrimaryGeneratedColumn({ type: 'int' })
  id: FeedbackId;

@Column({ nullable: true })
  name: string;

@Column({ nullable: true })
  email: string;

@Column({ type: 'int', nullable: true })
  rating: number;

@Column({ nullable: true })
  message: string;

@Column()
  ip: string;

@CreateDateColumn()
  createdAt: Timestamp;

@ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

@Column()
  userId: UserId;
}
