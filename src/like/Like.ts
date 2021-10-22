import { Plant } from "plant/Plant";
import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn
} from "typeorm";
import { User } from "user/User";

type LikeId = number

@Entity()
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: LikeId;

    @ManyToOne(() => User, (user) => user.likes, { nullable: false })
    user: User;

    @ManyToOne(() => Plant, (plant) => plant.likes, { nullable: false })
    plant: User;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn({ select: false })
    deletedAt?: Date;

}
