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

  @Column({ select: false })
    joinStatusText:string;

  @Column({ nullable: true, select: false })
    bioText?:string;

  @Column({ nullable: true, select: false })
    livesIn?: string;

  @Column({ nullable: true, select: false })
    from?: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
