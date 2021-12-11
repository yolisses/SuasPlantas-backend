import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SSL,
  DB_TYPE,
  DB_USER,
} from 'env/env';
import { Image } from 'image/Image';
import { Like } from 'like/Like';
import { Plant } from 'plant/Plant';
import { Tag } from 'tag/Tag';
import { ConnectionOptions } from 'typeorm';
import { User } from 'user/User';

export const dbConfig: ConnectionOptions = {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  type: DB_TYPE as 'postgres',
  port: parseInt(DB_PORT, 10),
  host: DB_HOST,
  ssl: DB_SSL.toLocaleLowerCase() === 'true',

  synchronize: true,
  logging: false,

  entities: [Plant, User, Tag, Image, Like],
};
