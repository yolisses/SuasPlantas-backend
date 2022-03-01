import { Chat } from './Chat';
import { UserId } from '../users/User';

export async function getUserChats(userId:UserId) {
  const query = Chat.createQueryBuilder('chat')
    .setParameter('id', userId)
    .addSelect('case when user1 = :id then user2 else user1 end', 'otherUserId')
    .where('user1 = :id')
    .orWhere('user2 = :id');

  return query.getMany();
}
