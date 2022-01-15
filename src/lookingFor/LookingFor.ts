import {
  BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantId } from '../plants/Plant';
import { User, UserId } from '../users/User';

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class LookingFor extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
      id: number;

    @Column()
      name: string;

    @ManyToOne(() => User, (user) => user.plants, { nullable: false })
      user: User;

    @Column()
      userId: UserId;
}
