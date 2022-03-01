import { DeepPartial } from 'typeorm';
import { Message } from './Message';

export const mockMessages:DeepPartial<Message>[] = [
  {
    id: 0,
    text: 'yo, how is going?',
    ownerId: 1,
    receiverId: 2,
  },
  {
    id: 1,
    text: 'good',
    ownerId: 2,
    receiverId: 1,
  },
  {
    id: 2,
    text: 'and u',
    ownerId: 2,
    receiverId: 1,

  },
  {
    id: 3,
    text: 'nice 2',
    ownerId: 1,
    receiverId: 2,
  },
  {
    id: 4,
    text: 'do you want to swap this samamban?',
    ownerId: 1,
    receiverId: 2,

  },
  {
    id: 5,
    text: 'of course!',
    ownerId: 2,
    receiverId: 1,
  },
  {
    id: 6,
    text: 'can be by this ficcus?',
    ownerId: 1,
    receiverId: 2,
  },
  {
    id: 7,
    text: 'yeap',
    ownerId: 2,
    receiverId: 1,
  },
  {
    id: 8,
    text: 'I bring it tomorrow?',
    ownerId: 2,
    receiverId: 1,
  },
  {
    id: 9,
    text: 'sure, scheduled!',
    ownerId: 1,
    receiverId: 2,
  },
];
