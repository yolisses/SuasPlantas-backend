import { Message } from './Message';
import { UserId } from '../users/User';

interface SendMessageParams{
    text:string
    senderId: UserId
    receiverId:UserId
}

export async function sendMessage({ text, senderId, receiverId }:SendMessageParams) {
  return Message.create({ text, senderId, receiverId }).save();
}
