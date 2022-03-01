import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { User, UserId } from '../users/User';

export type ChatId = number

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:ChatId;

    @Column()
      user1: number;

    @Column()
      user2: number;

    @OneToMany(() => Message, (message) => message.chat, { cascade: true })
      messages: Message[];

    @CreateDateColumn()
      createdAt:Date;
}
