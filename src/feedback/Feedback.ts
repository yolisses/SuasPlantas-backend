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

@Column()
  name: string;

@Column()
  email: string;

@Column({ type: 'int' })
  rating: number;

@Column()
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
