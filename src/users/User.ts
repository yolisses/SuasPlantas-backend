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
import { Message } from '../chat/Message';
import { Chat } from '../chat/Chat';
import { UserChat } from '../chat/UserChat';

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
    srid: 4326,
    nullable: true,
    type: 'geography',
    spatialFeatureType: 'Point',
  })
  @Index({ spatial: true })
    location: Point;

  @OneToMany(() => Plant, (plant) => plant.user, { cascade: true })
    plants: Plant[];

  @OneToMany(() => Message, (message) => message.sender, { cascade: true })
    sentMessages: Message[];

  @OneToMany(() => Quest, (quest) => quest.user, { cascade: true })
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

  @DeleteDateColumn()
    deletedAt: Timestamp;

  @Column({ select: false, nullable: true })
    ip: string;

  @Column({ type: 'bigint', select: false, nullable: true })
    fbId: string;

  @Column({
    select: false, length: 6, unique: true, nullable: true,
  })
    preview:string;
}
