import { Chat } from './Chat';

export async function findOrCreateChat(users:number[]) {
  const usersIds = users.sort();
  const [user1, user2] = usersIds;
  let chat = await Chat.findOne({ user1, user2 });
  if (!chat) {
    chat = await Chat.create({ user1, user2 }).save();
  }
  return chat;
}
