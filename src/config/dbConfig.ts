import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { entities } from '../database/entities';
import { DB_SSL, DATABASE_URL, isTest } from './env';

export const dbConfig: ConnectionOptions = {
  entities,
  logging: false,
  type: 'postgres',
  synchronize: true,
  url: DATABASE_URL,
  dropSchema: isTest,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: DB_SSL ? { rejectUnauthorized: false } : undefined,
};
