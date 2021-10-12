import { RequestHandler } from "express";
import { User } from "../entity/User";


export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.find()
    return res.send(users)
}

export const getUser: RequestHandler = async (req, res) => {
    const users = await User.findOne(req.params.id)
    return res.send(users)
}

export const remove: RequestHandler = async (req, res) => {
    const users = await User.find()
    return res.send(users)
}