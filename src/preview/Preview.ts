import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { User, UserId } from '../users/User';

@Entity()
export class Preview extends BaseEntity {
    @PrimaryColumn()
      id:string;

    @Column()
      userId:UserId;

    @OneToOne(() => User, (user) => user.preview)
    @JoinColumn()
      user: User;
}
