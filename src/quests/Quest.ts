import {
  Index,
  Column,
  Entity,
  Timestamp,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

export type QuestId = number

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Quest extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
      id: QuestId;

    @Index({ fulltext: true })
    @Column()
      name: string;

    @ManyToOne(() => User, (user) => user.quests, { nullable: false })
      user: User;

    @Column()
      userId: UserId;

    @CreateDateColumn()
      createdAt: Timestamp;

    @UpdateDateColumn()
      updatedAt: Timestamp;
}
