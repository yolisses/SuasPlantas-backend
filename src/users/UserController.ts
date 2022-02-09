import { Request, Response } from 'express';
import { signIn } from './signIn';
import { getUser } from './getUser';
import { getUsers } from './getUsers';
import { editUser } from './editUser';
import { getReqIp } from './getReqIp';
import { error } from '../utils/error';
import { removeUser } from './removeUser';
import { getUserQuests } from './getUserQuests';
import { editUserLocation } from './editUserLocation';
import { getUserPreview } from '../preview/getPreview';
import { setUserPreview } from '../preview/setUserPreview';
import { createUserByProfile } from './createUserByProfile';
import { validateProvided } from '../utils/validateProvided';
import { validateAuthenticated } from '../utils/validateAuthenticated';

export const UserController = {
  async getOne(req, res) {
    const { id } = req.params;
    const user = await getUser(Number(id));
    return res.send(user);
  },

  async me(req: Request, res) {
    validateAuthenticated(req);
    const { userId } = req.session;
    const user = await getUser(userId);
    return res.send(user);
  },

  async remove(req, res) {
    const { userId } = req.session;
    await removeUser(userId);
    return res.send();
  },

  async edit(req, res) {
    const { userId } = req.session;
    const user = await editUser(userId, req.body);
    return res.send(user);
  },

  async editLocation(req, res) {
    const { userId } = req.session;
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
    req.session.userId = user.id;
    return res.send(user);
  },

  async createByProfile(req:Request, res:Response) {
    const { name, image } = req.body;
    const user = await createUserByProfile({ name, image });
    res.status(201).send(user);
  },

  async logout(req:Request, res:Response) {
    req.session.destroy((err) => {
      if (err) { error(500, 'Unexpected error in logout'); }
      return res.end();
    });
  },

  async getQuests(req:Request, res:Response) {
    const { userId } = req.session;
    const quests = await getUserQuests(userId);
    return res.send(quests);
  },

  async getMany(req:Request, res:Response) {
    const users = await getUsers({
      ...req.query,
      page: Number(req.query) || 0,
    });
    return res.send(users);
  },

  async getPreview(req:Request, res:Response) {
    const ip = getReqIp(req);
    const { code } = req.params;
    validateProvided({ code });
    const user = await getUserPreview(code as string, ip);
    res.send(user);
  },

  async setAsPreview(req:Request, res:Response) {
    const { userId } = req.session;
    const user = await setUserPreview(userId, false);
    res.send(user);
  },
};
