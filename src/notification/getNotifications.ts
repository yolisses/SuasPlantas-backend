import { paginateResults } from '../common/paginateResults';
import { Plant } from '../plant/Plant';
import { UserId } from '../users/User';
import { Notification } from './Notification';

interface GetNotificationsParams{
  userId:UserId
  page?:number
  take?:number
}

export async function getNotifications({ userId, page = 0, take = 20 }:GetNotificationsParams) {
  const query = Notification.createQueryBuilder('notification');

  query.leftJoinAndMapOne('notification.entity', 'plant', 'plant', 'plant.id = notification.entityId');
  query.where('notification.userId = :userId', { userId });

  const skip = page * take;
  query.limit(take).skip(skip);
  return paginateResults(query.getManyAndCount(), { page, take });
}
