import { RequestHandler } from "express"
import { User } from "./User"

export const getUser: RequestHandler = async (req, res) => {
    const users = await User.findOne(req.params.id)
    return res.send(users)
}
