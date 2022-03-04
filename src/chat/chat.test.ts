/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Message } from './Message';
import { User } from '../users/User';
import { saveMessage } from './saveMessage';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { startDatabase } from '../database/startDatabase';

beforeAll(async () => {
  await startDatabase();
  const userRepo = User.getRepository();
  const messageRepo = Message.getRepository();

  await Promise.all([
    userRepo.insert({ id: 1, name: `user ${1}`, image: `image ${1}` }),
    userRepo.insert({ id: 2, name: `user ${2}`, image: `image ${2}` }),
    userRepo.insert({ id: 3, name: `user ${3}`, image: `image ${3}` }),
    userRepo.insert({ id: 4, name: `user ${4}`, image: `image ${4}` }),
  ]);

  const messages = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2]];

  await Promise.all(
    messages.map(async (value, id) => messageRepo.insert({
      id: id + 1, senderId: value[0], receiverId: value[1], text: `${value[0]} -> ${value[1]}`,
    })),
  );
});

it('should return user chats', async () => {
  const userId = 1;
  const chats = await getUserChats(userId);
  expect(chats[0].lastTime > chats[1].lastTime);
  expect(chats).toEqual([
    {
      text: '3 -> 1',
      senderId: 3,
      receiverId: 1,
      lastTime: expect.any(Date),
      userId: 3,
      name: 'user 3',
      image: 'image 3',
    },
    {
      text: '2 -> 1',
      senderId: 2,
      receiverId: 1,
      lastTime: expect.any(Date),
      userId: 2,
      name: 'user 2',
      image: 'image 2',
    },
  ]);
});

it('should return chat messages', async () => {
  const res = await getChatMessages({ userIds: [1, 2] });
  expect(res).toMatchObject({
    pageData: {
      page: 0, totalPages: 1, totalCount: 2, nextPage: null,
    },
    content: [
      {
        id: 2,
        text: '2 -> 1',
        senderId: 2,
        sender: undefined,
        receiverId: 1,
        receiver: undefined,
        createdAt: expect.any(Date),
      },
      {
        id: 1,
        text: '1 -> 2',
        senderId: 1,
        sender: undefined,
        receiverId: 2,
        receiver: undefined,
        createdAt: expect.any(Date),
      },
    ],
  });
  expect(res.content[0].createdAt > res.content[1].createdAt);
});

it('should send a message', async () => {
  const message = await saveMessage({ text: '3 -> 4', senderId: 3, receiverId: 4 });
  expect(message).toMatchObject(
    {
      id: expect.any(Number),
      text: '3 -> 4',
      senderId: 3,
      sender: undefined,
      receiverId: 4,
      receiver: undefined,
      createdAt: expect.any(Date),
    },
  );
});
