import { Request, Response } from 'express';
import { signIn } from './signIn';
import { getUser } from './getUser';
import { editUser } from './editUser';
import { error } from '../utils/error';
import { removeUser } from './removeUser';
import { editUserLocation } from './editUserLocation';
import { sessionMaxAge } from '../config/sessionConfig';
import { validateProvided } from '../utils/validateProvided';
import { validateAuthenticated } from '../utils/validateAuthenticated';

export const UserController = {
  async getOne(req, res) {
    const { id } = req.params;
    const user = await getUser(id);
    return res.send(user);
  },

  async me(req: Request, res) {
    validateAuthenticated(req);
    const { userId } = req.session;
    const user = await getUser(userId);
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
    const { ip } = req;
    const { accessToken } = req.body;
    const user = await signIn({ accessToken, ip });
    req.session.userId = user.id;
    req.session.user = user;
    res.cookie('authenticated', 'true', {
      maxAge: sessionMaxAge,
      sameSite: 'none',
      secure: true,
    });
    return res.send({ user });
  },

  async logout(req:Request, res:Response) {
    req.session.destroy((err) => {
      if (err) { error(500, 'Unexpected error in logout'); }
      res.clearCookie('authenticated');
      res.clearCookie('connect.sid');
      return res.end();
    });
  },
};
