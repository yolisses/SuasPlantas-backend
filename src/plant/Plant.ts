import { Point } from "geojson";
import { PlantImage } from "image/PlantImage";
import { Tag } from "tag/Tag";
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
} from "typeorm";
import { User, UserId } from "user/User";

export type PlantId = number;

@Entity()
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: PlantId;

  @Column()
  name: string;

  @Column({
    scale: 2,
    precision: 6,
    type: "decimal",
    unsigned: true,
    nullable: true,
  })
  price: number;

  @Column({
    type: "int",
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
  state: string;

  @Column()
  city: string;

  @Column()
  card: string;

  @Column({
    type: "geography",
    spatialFeatureType: "Point",
  })
  @Index({ spatial: true })
  location: Point;

  @BeforeUpdate()
  @BeforeInsert()
  checkAvailabilities() {
    if (!this.price && !this.swap && !this.donate) {
      throw new Error("Plant with no price or swap or donate");
    }
  }

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.plants, { nullable: false })
  user: User;

  @Column()
  userId: UserId;

  @OneToMany(() => PlantImage, (image) => image.plant, { onDelete: "CASCADE" })
  images: PlantImage[];
}
