import crypto from 'crypto';
import { UserId, User } from '../users/User';
import { ONESIGNAL_REST_API_KEY } from '../config/env';

export async function getNotificationHash(userId:UserId) {
  const user = await User.findOneOrFail(userId);
  const hmac = crypto.createHmac('sha256', ONESIGNAL_REST_API_KEY);
  console.log(user.email);
  hmac.update('stunik@gmail.com');
  const result = hmac.digest('hex');
  console.log(result);
  return result;
}
