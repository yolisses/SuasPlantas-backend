import { getUser } from "./getUser";
import { removeUser } from "./removeUser";

export const UserController = {

    async getOne(req, res) {
        const { id } = req.params;
        const plant = await getUser(id);
        res.send(plant);
    },

    async remove(req, res) {
        const { id } = req.params;
        await removeUser(id);
        res.send();
    },
}