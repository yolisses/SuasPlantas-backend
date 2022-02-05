import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../users/User';

@Entity()
export class Preview {
    @PrimaryColumn()
      id:string;

    @OneToOne(() => User, (user) => user.preview)
    @JoinColumn()
      user: User;
}
