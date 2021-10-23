import { Plant, PlantId } from "plant/Plant";
import {
    Column,
    Entity,
    ManyToOne,
    Timestamp,
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { User, UserId } from "user/User";

type LikeId = number

@Entity({ name: "likes" })
@Unique(["plantId", "userId"])
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: LikeId;

    @ManyToOne(() => User, (user) => user.likes, { nullable: false })
    user: User;

    @Column()
    userId: UserId;

    @ManyToOne(() => Plant, (plant) => plant.likes, { nullable: false })
    plant: User;

    @Column()
    plantId: PlantId;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn({ select: false })
    deletedAt?: Date;

}
