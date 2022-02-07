import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

export type PreviewId = string

@Entity()
export class Preview extends BaseEntity {
    @PrimaryColumn()
      id:PreviewId;

    @Column()
      userId:UserId;

    @OneToOne(() => User, (user) => user.preview)
    @JoinColumn()
      user: User;
}
