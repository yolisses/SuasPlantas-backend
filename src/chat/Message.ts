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
      chatId: ChatId;

    @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
      chat: Chat;

    @CreateDateColumn()
      createdAt:Date;
}
