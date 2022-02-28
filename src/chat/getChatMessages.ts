import { paginateResults } from '../common/paginateResults';
import { UserId } from '../users/User';
import { Message } from './Message';

interface GetChatMessagesParams{
    userId1: UserId
    userId2:UserId
    page?:number
    take?:number
}

export async function getChatMessages({
  userId1,
  userId2,
  page = 0,
  take = 50,
}:GetChatMessagesParams) {
  const query = Message.createQueryBuilder('message');
  const queryValues = { id1: userId1, id2: userId2 };
  query.where('message.receiverId = :id1 and message.ownerId = :id2', queryValues);
  query.orWhere('message.receiverId = :id2 and message.ownerId = :id1', queryValues);

  const skip = page * take;
  query
    .skip(skip)
    .take(take);

  return paginateResults(query.getManyAndCount(), { page, take });
}
