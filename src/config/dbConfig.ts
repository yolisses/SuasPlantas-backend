import { ConnectionOptions } from 'typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SSL,
  DB_USER,
} from './env';
import { Tag } from '../plants/Tag';
import { User } from '../users/User';
import { Image } from '../upload/Image';
import { Plant } from '../plants/Plant';
import { Like } from '../plants/like/Like';
import { Session } from '../signIn/Session';

export const dbConfig: ConnectionOptions = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  type: 'postgres',
  port: parseInt(DB_PORT, 10),
  host: DB_HOST,
  ssl: DB_SSL.toLowerCase() === 'true',

  synchronize: true,
  logging: false,

  entities: [Plant, User, Tag, Image, Like, Session],
};
