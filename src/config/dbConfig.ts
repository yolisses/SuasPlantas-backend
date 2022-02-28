import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { databaseEntities } from '../database/databaseEntities';

import { DB_SSL, DATABASE_URL, isTest } from './env';

export const dbConfig: ConnectionOptions = {
  logging: false,
  type: 'postgres',
  synchronize: true,
  url: DATABASE_URL,
  dropSchema: isTest,
  entities: databaseEntities,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: DB_SSL ? { rejectUnauthorized: false } : undefined,
};
