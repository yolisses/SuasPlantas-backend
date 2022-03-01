import {
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  RelationId,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';
import { Message } from './Message';

export type ChatId = number

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:ChatId;

    @RelationId((chat: Chat) => chat.users)
      userIds: UserId[];

    @ManyToMany(() => User, { eager: true, nullable: false })
    @JoinTable()
      users: User[];

    @OneToMany(() => Message, (message) => message.chat, { cascade: true })
      messages: Message[];

    @CreateDateColumn()
      createdAt:Date;
}
