import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/User';
import { Message } from './Message';

export type ChatId = number

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:ChatId;

    @Column()
      user1:number;

    @Column()
      user2:number;

    @OneToMany(() => Message, (message) => message.chat, { cascade: true })
      messages: Message[];
}
