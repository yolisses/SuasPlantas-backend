import { PlantImage } from 'image/PlantImage';
import { Like } from 'like/Like';
import { Plant } from 'plant/Plant';
import { Tag } from 'tag/Tag';
import { ConnectionOptions } from 'typeorm';
import { User } from 'user/User';

export const dbConfig:ConnectionOptions = {
  database: 'plantes-dev',
  username: 'postgres',
  password: '12345',
  type: 'postgres',
  port: 5432,
  synchronize: true,
  logging: false,
  entities: [
    Plant, User, Tag, PlantImage, Like,
  ],
};
