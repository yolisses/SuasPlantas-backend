import { Request, Response } from 'express';
import { signIn } from './signIn';
import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { editUser } from './editUser';
import { getReqIp } from './getReqIp';
import { removeUser } from './removeUser';
import { session } from '../session/session';
import { getUserQuests } from './getUserQuests';
import { editUserLocation } from './editUserLocation';
import { validateFound } from '../utils/validateFound';
import { validateProvided } from '../utils/validateProvided';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { int } from '../utils/int';

export const UserController = {
  async get(req:Request, res:Response) {
    const {
      page, radius, latitude, longitude, profileRelations, take,
    } = req.query;

    const users = await getUsers({
      ...req.query,
      page: int(page) || 0,
      take: int(take) || 50,
      radius: Number(radius),
      latitude: Number(latitude),
      longitude: Number(longitude),
      profileRelations: profileRelations === 'true',
    });
    return res.send(users);
  },

  async getOne(req, res) {
    const { id } = req.params;
    validateProvided({ id });
    const user = await getUser(Number(id));
    validateFound({ user });
    return res.send(user);
  },

  async me(req: Request, res) {
    validateAuthenticated(req);
    const { userId } = req;
    const user = await getUser(userId);
    validateFound({ user });
    return res.send(user);
  },

  async remove(req, res) {
    const { userId } = req;
    await removeUser(userId);
    return res.send();
  },

  async edit(req, res) {
    const { userId } = req;
    const user = await editUser(userId, req.body);
    return res.send(user);
  },

  async editLocation(req, res) {
    const { userId } = req;
    const { latitude, longitude } = req.body;
    validateProvided({ latitude, longitude });
    const location = { latitude, longitude };
    const result = await editUserLocation({ userId, location });
    return res.send(result);
  },

  async signIn(req:Request, res:Response) {
    const ip = getReqIp(req);
    const { accessToken, provider } = req.body;
    const user = await signIn({
      ip,
      provider,
      accessToken,
    });
    const token = await session().create(user.id);
    return res.setHeader('Authorization', token).send(user);
  },

  async logout(req:Request, res:Response) {
    await session().delete(req.token);
    return res.send();
  },

  async getQuests(req:Request, res:Response) {
    const { userId } = req;
    const quests = await getUserQuests(userId);
    return res.send(quests);
  },
};
