import { UserId } from '../users/User';
import { validateFound } from '../utils/validateFound';
import { validateOwner } from '../utils/validateOwner';
import { Notification } from './Notification';

interface IViewNotification{
    userId:UserId
    id:string
}

export async function viewNotification({ userId, id }:IViewNotification) {
  const notification = await Notification.findOne(id);
  validateFound({ notification });
  validateOwner({ notification }, userId);
  notification.viewed = true;
  return notification.save();
}
