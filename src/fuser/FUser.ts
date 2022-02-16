import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../location/City';

@Entity()
export class FUser extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
    id: string;

  @Column()
    name: string;

  @Column({ nullable: true })
    cityId: string;

  @ManyToOne(() => City, (city) => city.users)
    city: City;

  @Column()
    joinStatusText:string;

  @Column({ nullable: true })
    bioText?:string;

  @Column({ nullable: true })
    livesIn?: string;

  @Column({ nullable: true })
    from?: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
