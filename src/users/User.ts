import { Feedback } from 'aws-sdk/clients/guardduty';
import { Point } from 'geojson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { lookup } from 'dns/promises';
import { Plant } from '../plants/Plant';
import { LookingFor } from '../lookingFor/LookingFor';

export type UserId = number;

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: UserId;

  @Column()
    name: string;

  @Column({ unique: true })
    email: string;

  @Column()
    image: string;

  @Column({ nullable: true })
    description?: string;

  @Column({ nullable: true })
    instagramUsername?: string;

  @Column({ nullable: true })
    whatsappNumber?: string;

  @Column()
    state: string;

  @Column()
    city: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
  })
  @Index({ spatial: true })
    location: Point;

  @OneToMany(() => Plant, (plant) => plant.user)
    plants: Plant[];

  @OneToMany(() => LookingFor, (lookingFor) => lookingFor.user)
    lookingFors: LookingFor[];

  @ManyToMany(() => Plant, (plant) => plant.likedBy)
  @JoinTable()
    likedPlants: Plant[];

  @OneToMany(() => Plant, (plant) => plant.user)
    feedbacks: Feedback[];

  @CreateDateColumn()
    createdAt: Timestamp;

  @UpdateDateColumn()
    updatedAt: Timestamp;

  @DeleteDateColumn({ select: false })
    deletedAt?: Date;
}
