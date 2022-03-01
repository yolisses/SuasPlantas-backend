import { paginateResults } from '../common/paginateResults';
import { UserId } from '../users/User';
import { Message } from './Message';

interface GetChatMessagesParams{
    userIds: [UserId, UserId]
    page?:number
    take?:number
}

export async function getChatMessages({
  userIds,
  page = 0,
  take = 50,
}:GetChatMessagesParams) {
  const [id1, id2] = userIds;
  const query = Message.createQueryBuilder('message')
    .setParameters({ id1, id2 })
    .where('message.receiverId = :id1 and message.ownerId = :id2')
    .orWhere('message.receiverId = :id2 and message.ownerId = :id1');

  const skip = page * take;
  query
    .skip(skip)
    .take(take);

  return paginateResults(query.getManyAndCount(), { page, take });
}
