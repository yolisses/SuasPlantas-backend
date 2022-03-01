import { UserId } from '../users/User';
import { Chat } from './Chat';

export async function getUserContacts(userId:UserId) {
  const query = Chat.createQueryBuilder('chat')
    .leftJoinAndSelect('chat.users', 'users');

  return query.getManyAndCount();
}
