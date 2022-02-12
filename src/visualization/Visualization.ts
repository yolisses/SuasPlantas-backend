import {
  BaseEntity,
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Visualization extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:number;

    @Column()
      ip:string;

    @Column({ type: 'bigint' })
      fbId: string;

    @CreateDateColumn()
      createdAt:Date;
}
