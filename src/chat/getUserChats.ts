import { Chat } from './Chat';
import { User, UserId } from '../users/User';

export async function getUserChats(userId:UserId) {
  const query = Chat.createQueryBuilder('chat')
    .setParameter('id', userId)
    .addSelect('i.name')
    .from<User>((subQuery) => subQuery.select('a.*').from(User, 'a'), 'i');

  return query.getMany();
}
