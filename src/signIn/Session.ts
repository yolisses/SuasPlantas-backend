import { ISession } from 'connect-typeorm';
import {
  BaseEntity,
  Column, Entity, Index, PrimaryColumn,
} from 'typeorm';

// as required by connect-typeorm
// session attributes are dynamic
@Entity()
export class Session extends BaseEntity implements ISession {
  @Index()
  @Column('bigint')
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  public id = '';

  @Column('text')
  public json = '';
}
