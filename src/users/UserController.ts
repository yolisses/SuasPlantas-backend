import { Request, Response } from 'express';
import { signIn } from './signIn';
import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { editUser } from './editUser';
import { getReqIp } from './getReqIp';
import { error } from '../utils/error';
import { removeUser } from './removeUser';
import { getReqUA } from '../request/getReqUA';
import { getUserQuests } from './getUserQuests';
import { editUserLocation } from './editUserLocation';
import { getUserPreview } from '../preview/getPreview';
import { setUserPreview } from '../preview/setUserPreview';
import { createUserByProfile } from './createUserByProfile';
import { validateProvided } from '../utils/validateProvided';
import { validateAuthenticated } from '../utils/validateAuthenticated';
import { validateFound } from '../utils/validateFound';
import { session } from '../session/session';

export const UserController = {
  async get(req:Request, res:Response) {
    const {
      page, radius, latitude, longitude,
    } = req.query;

    const users = await getUsers({
      ...req.query,
      page: Number(page) || 0,
      radius: Number(radius),
      latitude: Number(latitude),
      longitude: Number(longitude),
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
    const { accessToken, provider, previewCode } = req.body;
    const user = await signIn({
      ip,
      provider,
      accessToken,
      previewCode,
    });
    const token = await session().create(user.id);
    return res.setHeader('Authorization', token).send(user);
  },

  async createByProfile(req:Request, res:Response) {
    const {
      name, image, city, state, fbId,
    } = req.body;
    const user = await createUserByProfile({
      name, image, city, state, fbId,
    });
    res.status(201).send(user);
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

  async getPreview(req:Request, res:Response) {
    const ip = getReqIp(req);
    const ua = getReqUA(req);
    const { code } = req.params;
    validateProvided({ code });
    const user = await getUserPreview(code as string, ip, ua);
    res.send(user);
  },

  async setAsPreview(req:Request, res:Response) {
    const { userId } = req;
    const user = await setUserPreview(userId, false);
    res.send(user);
  },
};
