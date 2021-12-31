import { ConnectionOptions } from 'typeorm';
import { DATABASE_URL } from './env';
import { Tag } from '../plants/tag/Tag';
import { User } from '../users/User';
import { Image } from '../upload/Image';
import { Plant } from '../plants/Plant';
import { Like } from '../plants/like/Like';
import { Session } from '../signIn/Session';
import { Feedback } from '../feedback/Feedback';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  url: DATABASE_URL,

  synchronize: true,
  logging: false,

  entities: [Plant, User, Tag, Image, Like, Session, Feedback],
};
