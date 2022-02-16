import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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

  @Column({ nullable: true })
    deletedByIp: string;

  @CreateDateColumn({ select: false })
    createdAt: Date;

  @UpdateDateColumn({ select: false })
    updatedAt: Date;

  @DeleteDateColumn({ select: false })
    deletedAt:Date;
}
