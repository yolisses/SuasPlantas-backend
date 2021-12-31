import { UserId } from '../users/User';
import { Feedback } from './Feedback';

export async function addFeedback(feedback:Feedback, userId:UserId, ip:string) {
  return Feedback.create({
    ...feedback,
    userId,
    ip,
  }).save();
}
