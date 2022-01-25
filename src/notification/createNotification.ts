import { PlantId } from '../plant/Plant';
import { UserId } from '../users/User';
import { Notification } from './Notification';

interface CreateNotificationParams{
    userId:UserId
    entityId:PlantId
}

export async function createNotification({ userId, entityId }:CreateNotificationParams) {
  return Notification.create({ userId, entityId }).save();
}
