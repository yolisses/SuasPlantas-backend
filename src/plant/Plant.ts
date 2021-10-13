import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class Plant extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      name: string;

    @Column()
      description: string;
}
