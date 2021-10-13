import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plant {
    @PrimaryGeneratedColumn()
      id: number;

    @Column({ length: 64 })
      name: string;

    @Column('text')
      description: string;

    @Column('money')
      price: number;

    @Column()
      swap: boolean;

    @Column()
      donate: boolean;

    @Column()
      card: string;

    @Column()
      amount: number;
}
