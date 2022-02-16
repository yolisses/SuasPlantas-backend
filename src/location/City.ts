import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { State } from './State';
import { FUser } from '../fuser/FUser';

@Entity()
export class City extends BaseEntity {
    @PrimaryColumn()
      id:string;

    @Column()
      name:string;

    @Column()
      stateId: string;

    @ManyToOne(() => State, (state) => state.cities, { nullable: false })
      state: State;

    @OneToMany(() => FUser, (user) => user.city)
      users: FUser[];

    @CreateDateColumn({ select: false })
      createdAt:Date;

    @UpdateDateColumn({ select: false })
      updateAt:Date;
}
