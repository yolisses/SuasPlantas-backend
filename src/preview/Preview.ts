import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

export type PreviewCode = string

@Entity()
export class Preview extends BaseEntity {
    @PrimaryColumn()
      id:PreviewCode;

    @Column()
      userId:UserId;

    @OneToOne(() => User, (user) => user.preview)
    @JoinColumn()
      user: User;
}
