import { PlantImage } from 'image/PlantImage';
import { Like } from 'like/Like';
import { Plant } from 'plant/Plant';
import { Tag } from 'tag/Tag';
import { ConnectionOptions } from 'typeorm';
import { User } from 'user/User';

export const dbConfig = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  type: process.env.DATABASE_TYPE,
  port: parseInt(process.env.DATABASE_PORT, 10),

  synchronize: true,
  logging: false,

  entities: [
    Plant, User, Tag, PlantImage, Like,
  ],
}as ConnectionOptions;
