import crypto from 'crypto';
import { UserId, User } from '../users/User';
import { ONESIGNAL_REST_API_KEY } from '../config/env';

export interface GetNotificationHashResult{
  id:string
  email:string
  idHash:string
  emailHash:string
}

export async function getNotificationHash(userId:UserId):Promise<GetNotificationHashResult> {
  const { email } = await User.findOneOrFail(userId, { select: ['id', 'email'] });
  const id = `${userId}`;
  console.log(id);
  const idHash = crypto
    .createHmac('sha256', ONESIGNAL_REST_API_KEY)
    .update(id)
    .digest('hex');
  const emailHash = crypto
    .createHmac('sha256', ONESIGNAL_REST_API_KEY)
    .update(email)
    .digest('hex');

  return {
    id,
    email,
    idHash,
    emailHash,
  };
}
