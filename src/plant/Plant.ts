import { Point } from 'geojson';
import { PlantImage } from 'image/PlantImage';
import { Tag } from 'tag/Tag';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  OneToMany,
  DeleteDateColumn,
  ManyToOne,
  Index,

} from 'typeorm';
import { User } from 'user/User';

@Entity()
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

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

  @Column({ nullable: true })
  description?: string;

  @Column()
  state: string

  @Column()
  city: string

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
  })
  @Index({ spatial: true })
  location: Point;

  @BeforeUpdate()
  @BeforeInsert()
  checkAvailabilities() {
    if (!this.price && !this.swap && !this.donate) {
      throw new Error('Plant with no price or swap or donate');
    }
  }

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.plants, { nullable: false })
  user: User;

  @OneToMany(() => PlantImage, (image) => image.plant)
  images: PlantImage[];
}
