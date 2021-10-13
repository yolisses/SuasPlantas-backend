import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeUpdate, BeforeInsert, InsertEvent,
} from 'typeorm';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { IPlant } from './PlantInterface';

@Entity()
export class Plant extends BaseEntity implements IPlant {
    @PrimaryGeneratedColumn({ type: 'int' })
      id: number;

    @Column()
      name: string;

    @Column('decimal', { precision: 6, scale: 2, nullable: true })
      price: number;

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
      console.error(this.price);
    }
}
