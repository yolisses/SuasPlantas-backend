import { Chat } from './Chat';

export async function findChat(users:number[]) {
  const usersIds = users.sort();
  const [user1, user2] = usersIds;
  return Chat.findOne({ user1, user2 });
}
