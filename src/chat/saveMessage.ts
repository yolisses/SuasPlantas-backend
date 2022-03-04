import { Message } from './Message';
import { UserId } from '../users/User';

interface SaveMessageParams{
    text:string
    senderId: UserId
    receiverId:UserId
}

export async function saveMessage({ text, senderId, receiverId }:SaveMessageParams) {
  return Message.create({ text, senderId, receiverId }).save();
}
