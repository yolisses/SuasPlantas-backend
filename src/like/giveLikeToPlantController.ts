import { Request, Response } from "express";
import { giveLikeToItemService } from "./giveLikeToPlantService";

export async function giveLikeToPlantController(req: Request, res: Response) {
    const { plantId } = req.params
    const { userId } = req
    const like = await giveLikeToItemService(Number(plantId), userId)
    return res.send(like)
}