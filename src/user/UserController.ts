import { RequestHandler } from "express";
import { User } from "./User";

export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.find()
    return res.send(users)
}

export const remove: RequestHandler = async (req, res) => {
    const users = await User.find()
    return res.send(users)
}