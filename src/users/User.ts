import { Feedback } from 'aws-sdk/clients/guardduty';
import { Point } from 'geojson';
import {
  Index,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  Timestamp,
  ManyToMany,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plant } from '../plant/Plant';
import { Quest } from '../quests/Quest';

export type UserId = number;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: UserId;

  @Index({ fulltext: true })
  @Column()
    name: string;

  @Column({ unique: true, select: false })
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

  @OneToMany(() => Quest, (quest) => quest.user)
    quests: Quest[];

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

  @Column({ select: false, nullable: true })
    ip: string;
}
