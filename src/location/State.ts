import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { City } from './City';

@Entity()
export class State extends BaseEntity {
    @PrimaryColumn({ length: 2 })
      id:string;

    @Column()
      name:string;

    @OneToMany(() => City, (city) => city.state, { cascade: true })
      cities: City[];

    @CreateDateColumn()
      createdAt:Date;

    @UpdateDateColumn()
      updateAt:Date;
}
