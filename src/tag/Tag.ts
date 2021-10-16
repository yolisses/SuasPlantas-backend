import { Entity, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryColumn()
  name: string;
}
