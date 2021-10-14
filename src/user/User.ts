import { Point } from "geojson";
import { Plant } from "plant/Plant";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    description?: string

    @Column({ nullable: true })
    instagramUsername?: string

    @Column({ nullable: true })
    whatsappNumber?: number

    @OneToMany(() => Plant, (plant) => plant.user)
    plants: Plant[];

    @Column({
        nullable: true,
        type: 'geography',
        spatialFeatureType: 'Point',
    })
    @Index({ spatial: true })
    location: Point;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    deletedAt?: Date;
}