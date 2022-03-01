import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat, ChatId } from './Chat';
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
      chatId: ChatId;

    @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
      chat: Chat;

    @CreateDateColumn()
      createdAt:Date;
}
