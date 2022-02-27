import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

export type MessageId = number

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:MessageId;

    @Column()
      text:string;

    @Column()
      ownerId: UserId;

    @ManyToOne(() => User, (user) => user.plants, { nullable: false })
      owner: User;

    @Column()
      receiverId: UserId;

    @ManyToOne(() => User, (user) => user.plants, { nullable: false })
      receiver: User;

    @CreateDateColumn()
      createdAt:Date;
}
