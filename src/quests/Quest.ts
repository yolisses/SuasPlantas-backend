import {
  BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Quest extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
      id: number;

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

    @DeleteDateColumn({ select: false })
      deletedAt?: Date;
}
