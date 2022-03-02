import { paginateResults } from '../common/paginateResults';
import { ChatId } from './Chat';
import { Message } from './Message';

interface GetChatMessagesParams{
  page?: number;
  take?: number;
  chatId:ChatId
}

export function getChatMessages({ chatId, page = 0, take = 50 }:GetChatMessagesParams) {
  const query = Message.createQueryBuilder('message');
  query.where('message.chatId = :chatId', { chatId });

  const skip = page * take;
  query
    .skip(skip)
    .take(take);
  return paginateResults(query.getManyAndCount(), { page, take });
}
