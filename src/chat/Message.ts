import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';
import { Chat, ChatId } from './Chat';

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
