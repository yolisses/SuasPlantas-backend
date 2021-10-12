import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
export class Plant {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 64 })
    name: string

    @Column("text")
    description: string

    @Column("money")
    price: Number

    @Column()
    swap: Boolean

    @Column()
    donate: Boolean

    @Column()
    card: string

    @Column()
    amount: Number

}
