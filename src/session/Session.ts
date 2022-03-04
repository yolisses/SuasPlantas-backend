import {
  BaseEntity,
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
      token:string;

    @Column()
      userId:number;

    @CreateDateColumn()
      createdAt:Date;
}
