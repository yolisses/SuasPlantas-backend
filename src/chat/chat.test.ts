/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Chat } from './Chat';
import { Message } from './Message';
import { User } from '../users/User';
import { sendMessage } from './sendMessage';
import { getUserChats } from './getUserChats';
import { getChatMessages } from './getChatMessages';
import { findOrCreateChat } from './findOrCreateChat';
import { startDatabase } from '../database/startDatabase';

beforeAll(async () => {
  await startDatabase();
  for (const id of [1, 2, 3, 4]) {
    await User.create({ id, name: `user ${id}`, image: `image ${id}` }).save();
  }
  await Chat.create({ id: 1, user1: 1, user2: 2 }).save();
  await Chat.create({ id: 2, user1: 1, user2: 3 }).save();
  await Chat.create({ id: 3, user1: 2, user2: 3 }).save();
  await Message.create({
    id: 1, text: '1 -> 2', senderId: 1, chatId: 1,
  }).save();
  await Message.create({
    id: 2, text: '2 -> 1', senderId: 2, chatId: 1,
  }).save();
  await Message.create({
    id: 3, text: '1 -> 3', senderId: 1, chatId: 2,
  }).save();
  await Message.create({
    id: 4, text: '3 -> 1', senderId: 3, chatId: 2,
  }).save();
  await Message.create({
    id: 5, text: '2 -> 3', senderId: 2, chatId: 3,
  }).save();
  await Message.create({
    id: 6, text: '3 -> 2', senderId: 3, chatId: 3,
  }).save();
});

it('should return user chats', async () => {
  const userId = 1;
  const chats = await getUserChats(userId);
  expect(chats[0].lastTime > chats[1].lastTime);
  expect(chats).toEqual(
    [
      {
        id: 2,
        userId: 3,
        name: 'user 3',
        image: 'image 3',
        lastText: '3 -> 1',
        lastUserId: 3,
        lastTime: expect.any(Date),
      },
      {
        id: 1,
        userId: 2,
        name: 'user 2',
        image: 'image 2',
        lastText: '2 -> 1',
        lastUserId: 2,
        lastTime: expect.any(Date),
      },
    ],
  );
});

it('should return chat messages', async () => {
  const res = await getChatMessages({ chatId: 1 });
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
        chatId: 1,
        chat: undefined,
        createdAt: expect.any(Date),
      },
      {
        id: 1,
        text: '1 -> 2',
        senderId: 1,
        sender: undefined,
        chatId: 1,
        chat: undefined,
        createdAt: expect.any(Date),
      }],
  });
  expect(res.content[0].createdAt > res.content[1].createdAt);
});

it('should return a present chat', async () => {
  const users = [1, 2];
  const chat = await findOrCreateChat(users);
  expect(chat).toMatchObject({
    id: 1, user1: 1, user2: 2, messages: undefined,
  });
});

it('should return a new chat', async () => {
  const users = [3, 4];
  const chat = await findOrCreateChat(users);
  expect(chat).toMatchObject({
    id: expect.any(Number), user1: 3, user2: 4, messages: undefined,
  });
});

it('should send a message', async () => {
  const users = [3, 4];
  const { id: chatId } = await findOrCreateChat(users);
  const message = await sendMessage({ chatId, text: '3 -> 4', senderId: 3 });
  expect(message).toMatchObject(
    {
      id: expect.any(Number),
      text: '3 -> 4',
      senderId: 3,
      sender: undefined,
      chatId: 4,
      chat: undefined,
      createdAt: expect.any(Date),
    },
  );
});
