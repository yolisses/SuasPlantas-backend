import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DB_SSL, DATABASE_URL } from './env';
import { entities } from '../database/entities';

export const dbConfig: ConnectionOptions = {
  entities,
  logging: false,
  type: 'postgres',
  synchronize: true,
  url: DATABASE_URL,
  dropSchema: false,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: DB_SSL ? { rejectUnauthorized: false } : undefined,
};
