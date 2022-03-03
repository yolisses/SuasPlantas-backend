import { paginateResults } from '../common/paginateResults';
import { UserId } from '../users/User';
import { ChatId } from './Chat';
import { Message } from './Message';

interface GetChatMessagesParams{
  page?: number;
  take?: number;
  userIds:[UserId, UserId]
}

export function getChatMessages({ userIds, page = 0, take = 10000 }:GetChatMessagesParams) {
  const [id1, id2] = userIds.sort();
  const query = Message.createQueryBuilder('message');
  query.setParameters({ id1, id2 });
  query.where('message.senderId = :id1 and message.receiverId = :id2');
  query.orWhere('message.senderId = :id2 and message.receiverId = :id1');

  const skip = page * take;
  query
    .skip(skip)
    .take(take);
  return paginateResults(query.getManyAndCount(), { page, take });
}
