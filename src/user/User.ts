import { Plant } from "plant/Plant";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn
} from "typeorm";

@Entity()
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

    @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
    location: string

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    deletedAt?: Date;
}