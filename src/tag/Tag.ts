import {
  Entity, BaseEntity, PrimaryColumn,
} from 'typeorm';
import { ITag } from './TagInterface';

@Entity()
export class Tag extends BaseEntity implements ITag {
    @PrimaryColumn()
      name: string;
}
