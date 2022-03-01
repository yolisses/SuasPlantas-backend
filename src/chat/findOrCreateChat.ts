import { Chat } from './Chat';
import { UserId } from '../users/User';

export async function findOrCreateChat(users:UserId[]) {
  const userIds = users.sort();
  let chat = await Chat.findOne({ where: { userIds } });
  if (!chat) {
    chat = await Chat.create({ userIds }).save();
  }
  return chat;
}
