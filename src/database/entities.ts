import { View } from '../view/View';
import { User } from '../users/User';
import { Tag } from '../plant/tag/Tag';
import { Plant } from '../plant/Plant';
import { FUser } from '../fuser/FUser';
import { Image } from '../upload/Image';
import { City } from '../location/City';
import { State } from '../location/State';
import { Message } from '../chat/Message';
import { Session } from '../session/SessionEntity';
import { PlantView } from '../plant/PlantView';
import { Feedback } from '../feedback/Feedback';
import { Interaction } from '../interaction/Interaction';
import { Notification } from '../notification/Notification';
import { Visualization } from '../visualization/Visualization';

export const entities = [
  Tag,
  View,
  User,
  City,
  FUser,
  State,
  Plant,
  Image,
  Session,
  Message,
  Feedback,
  Interaction,
  Notification,
  Visualization,

  PlantView,
];
