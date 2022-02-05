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
  OneToOne,
} from 'typeorm';
import { Plant } from '../plant/Plant';
import { Preview } from '../preview/Preview';
import { Quest } from '../quests/Quest';

export type UserId = number;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: UserId;

  @Index({ fulltext: true })
  @Column()
    name: string;

  @Column({ unique: true, select: false, nullable: true })
    email: string;

  @Column()
    image: string;

  @Column({ nullable: true })
    description?: string;

  @Column({ nullable: true })
    instagramUsername?: string;

  @Column({ nullable: true })
    whatsappNumber?: string;

  @Column({ nullable: true })
    state: string;

  @Column({ nullable: true })
    city: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    nullable: true,
  })
  @Index({ spatial: true })
    location: Point;

  @OneToMany(() => Plant, (plant) => plant.user, { cascade: true })
    plants: Plant[];

  @OneToMany(() => Quest, (quest) => quest.user, { cascade: true })
    quests: Quest[];

  @ManyToMany(() => Plant, (plant) => plant.likedBy)
  @JoinTable()
    likedPlants: Plant[];

  @OneToMany(() => Plant, (plant) => plant.user)
    feedbacks: Feedback[];

  @OneToOne(() => Preview, (preview) => preview.user)
    preview: Preview;

  @CreateDateColumn()
    createdAt: Timestamp;

  @UpdateDateColumn()
    updatedAt: Timestamp;

  @DeleteDateColumn()
    deletedAt: Timestamp;

  @Column({ select: false, nullable: true })
    ip: string;
}
