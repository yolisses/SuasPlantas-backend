import {
  Entity,
  Index,
  Column,
  Timestamp,
  OneToMany,
  ManyToOne,
  JoinTable,
  BaseEntity,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Point } from 'geojson';

import { Tag } from './tag/Tag';
import { Image } from '../upload/Image';
import { User, UserId } from '../users/User';

export type PlantId = number;

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
    id: PlantId;

  @Index({ fulltext: true })
  @Column()
    name: string;

  @Column({
    scale: 2,
    precision: 6,
    type: 'decimal',
    unsigned: true,
    nullable: true,
  })
    price: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
    amount?: number;

  @Column({ default: false })
    swap: boolean;

  @Column({ default: false })
    donate: boolean;

  @Index({ fulltext: true })
  @Column({ nullable: true })
    description?: string;

  @Column({ nullable: true })
    card: string;

  @ManyToMany(() => Tag)
  @JoinTable()
    tags: Tag[];

  @Column()
    userId: UserId;

  @ManyToOne(() => User, (user) => user.plants, { nullable: false })
    user: User;

  @ManyToMany(() => User, (user) => user.likedPlants, { nullable: false })
  @JoinTable()
    likedBy: User[];

  @OneToMany(() => Image, (image) => image.plant, { onDelete: 'CASCADE' })
    images: Image[];

  @CreateDateColumn()
    createdAt: Timestamp;

  @UpdateDateColumn()
    updatedAt: Timestamp;

  @DeleteDateColumn()
    deletedAt: Timestamp;

  liked?:boolean;

  alsoSaw?: Plant[];
}
