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
        await removeUser(id);
        return res.send();
    },

    async getPlants(req, res) {
        const { id } = req.params
        const plants = await getUserPlants(id)
        return res.send(plants)
    }
}