import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeUpdate, BeforeInsert,
} from 'typeorm';
import { IPlant } from './PlantInterface';

@Entity()
export class Plant extends BaseEntity implements IPlant {
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

    @BeforeUpdate()
    @BeforeInsert()
    checkAvailabilities() {
      if (!this.price && !this.swap && !this.donate) {
        throw new Error('Plant with no price or swap or donate');
      }
    }
}
