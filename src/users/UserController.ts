import { Response } from 'express';
import { getPlants } from '../plants/getPlants';
import { editUser } from './editUser';
import { editUserLocation } from './editUserLocation';
import { getUser } from './getUser';
import { removeUser } from './removeUser';

import { NODE_ENV } from '../env/env';
import { generateToken } from '../auth/generateToken';
import { signIn } from './signIn';
import { validateProvided } from '../utils/validateProvided';

export const UserController = {
  async getOne(req, res) {
    const { id } = req.params;
    const plant = await getUser(id);
    return res.send(plant);
  },

  async remove(req, res) {
    const { userId } = req;
    await removeUser(userId);
    return res.send();
  },

  async getPlants(req, res) {
    const { userId } = req.params;
    const { page } = req.query;
    const plants = await getPlants({
      userId,
      take: 21,
      page: Number(page) || 0,
    });
    return res.send(plants);
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

  async signIn(req, res: Response) {
    const { ip } = req;
    const { googleToken } = req.body;
    const user = await signIn(googleToken, ip);
    const token = generateToken({ id: user.id });
    res.cookie('auth_login_token', token, {
      httpOnly: true,
      secure: NODE_ENV !== 'development',
    });

    return res.send({ user, token });
  },
};
