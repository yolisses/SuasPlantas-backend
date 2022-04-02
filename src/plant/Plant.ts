/* eslint-disable no-use-before-define */
import {
  Index,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
  BaseEntity,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Index({ fulltext: true })
  @Column({ nullable: true })
    description?: string;

  @Column({ nullable: true })
    card: string;

  @Column({ default: false })
    quest: boolean;

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
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn({ select: false })
    deletedAt: Date;

  liked?:boolean;

  alsoSaw?: Plant[];
}
