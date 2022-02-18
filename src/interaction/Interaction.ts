import {
  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Interaction extends BaseEntity {
    @PrimaryGeneratedColumn()
      id:number;

    @Column()
      ip:string;

    @Column({ type: 'jsonb' })
      data:object;

    @CreateDateColumn()
      createdAt:Date;
}
