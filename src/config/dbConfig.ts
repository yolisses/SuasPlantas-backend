import { ConnectionOptions } from 'typeorm';
import { DATABASE_URL, DB_SSL } from './env';
import { Like } from '../like/Like';
import { User } from '../users/User';
import { Image } from '../upload/Image';
import { Tag } from '../plants/tag/Tag';
import { Plant } from '../plants/Plant';
import { Session } from '../signIn/Session';
import { Feedback } from '../feedback/Feedback';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  ssl: DB_SSL ? {
    rejectUnauthorized: false,
  } : undefined,
  url: DATABASE_URL,

  synchronize: true,
  logging: false,

  entities: [Plant, User, Tag, Image, Like, Session, Feedback],
};
