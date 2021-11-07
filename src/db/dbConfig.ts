import { PlantImage } from 'image/PlantImage';
import { Like } from 'like/Like';
import { Plant } from 'plant/Plant';
import { Tag } from 'tag/Tag';
import { ConnectionOptions } from 'typeorm';
import { User } from 'user/User';

export const dbConfig:ConnectionOptions = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  type: process.env.DATABASE_TYPE as 'postgres',
  port: parseInt(process.env.DATABASE_PORT, 10),
  host: process.env.DATABASE_HOST,
  ssl: process.env.DATABASE_SSL.toLocaleLowerCase() === 'true',

  synchronize: true,
  logging: false,

  entities: [
    Plant, User, Tag, PlantImage, Like,
  ],
};
