import { error } from "utils/error";
import { editUser } from "./editUser";
import { getUser } from "./getUser";
import { getUserPlants } from "./getUserPlants";
import { removeUser } from "./removeUser";

export const UserController = {
  async getOne(req, res) {
    const { id } = req.params;
    const plant = await getUser(id);
    return res.send(plant);
  },

  async remove(req, res) {
    const { id } = req.params;
    const { userId } = req;
    if (userId !== id) error(403, "Unauthorized user trying to delete");
    await removeUser(id);
    return res.send();
  },

  async getPlants(req, res) {
    const { id } = req.params;
    const plants = await getUserPlants(id);
    return res.send(plants);
  },

  async edit(req, res) {
    const { userId } = req.params;
    const user = await editUser(userId, req.body);
    return res.send(user);
  },
};
