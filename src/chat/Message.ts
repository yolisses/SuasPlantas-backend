import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

export type MessageId = number

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:MessageId;

    @Column()
      text:string;

    @Column()
      senderId: UserId;

    @ManyToOne(() => User, (user) => user.sentMessages, { nullable: false })
      sender: User;

    @Column()
      receiverId: UserId;

    @ManyToOne(() => User, (user) => user.receivedMessages, { nullable: false })
      receiver: User;

    @CreateDateColumn()
      createdAt:Date;
}
