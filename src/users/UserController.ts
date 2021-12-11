import { getPlants } from '../plants/getPlants';
import { error } from '../utils/error';
import { editUser } from './editUser';
import { editUserLocation } from './editUserLocation';
import { getUser } from './getUser';
import { removeUser } from './removeUser';

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
    if (longitude === undefined || longitude === null) { error(400, 'Latitude not provided'); }
    if (longitude === undefined || longitude === null) { error(400, 'Longitude not provided'); }
    const location = { latitude, longitude };
    const result = await editUserLocation({ userId, location });
    return res.send(result);
  },
};
