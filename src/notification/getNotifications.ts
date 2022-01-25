import { paginateResults } from '../common/paginateResults';
import { UserId } from '../users/User';
import { Notification } from './Notification';

interface GetNotificationsParams{
  userId:UserId
  page?:number
  take?:number
}

export async function getNotifications({ userId, page = 0, take = 20 }:GetNotificationsParams) {
  const skip = page * take;
  return await paginateResults(
    Notification.findAndCount({ where: { userId }, skip, take }),
    { page, take },
  );
}
