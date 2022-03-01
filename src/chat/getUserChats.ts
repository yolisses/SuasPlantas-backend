import { Chat } from './Chat';

export async function getUserChats(userId:UserId) {
  const query = Chat.createQueryBuilder('chat')
    .leftJoinAndSelect('chat.messages', 'messages');

  return query.getMany();
}
