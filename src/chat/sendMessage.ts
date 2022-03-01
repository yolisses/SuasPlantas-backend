import { Message } from './Message';
import { UserId } from '../users/User';

interface SendMessageParams{
    text:string
    chatId:number
    senderId: UserId
}

export async function sendMessage({ text, senderId, chatId }:SendMessageParams) {
  return Message.create({ text, senderId, chatId }).save();
}
