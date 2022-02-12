import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import {
  DB_SSL,
  DATABASE_URL,
} from './env';
import { View } from '../view/View';
import { User } from '../users/User';
import { Tag } from '../plant/tag/Tag';
import { Plant } from '../plant/Plant';
import { Image } from '../upload/Image';
import { Quest } from '../quests/Quest';
import { Session } from '../signIn/Session';
import { PlantView } from '../plant/PlantView';
import { Feedback } from '../feedback/Feedback';
import { Notification } from '../notification/Notification';
import { Visualization } from '../visualization/Visualization';

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
    Visualization,

    PlantView,
  ],
};
