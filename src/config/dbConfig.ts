import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { View } from '../view/View';
import { User } from '../users/User';
import { Tag } from '../plant/tag/Tag';
import { Plant } from '../plant/Plant';
import { Image } from '../upload/Image';
import { Quest } from '../quests/Quest';
import { Session } from '../signIn/Session';
import { DATABASE_URL, DB_SSL } from './env';
import { Feedback } from '../feedback/Feedback';
import { Notification } from '../notification/Notification';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  ssl: DB_SSL ? {
    rejectUnauthorized: false,
  } : undefined,
  url: DATABASE_URL,

  synchronize: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),

  entities: [
    Tag,
    View,
    User,
    Quest,
    Plant,
    Image,
    Session,
    Feedback,
    Notification,
  ],
};
