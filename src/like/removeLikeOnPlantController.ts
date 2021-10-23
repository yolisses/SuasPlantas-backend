import { Request, Response } from "express";
import { removeLikeOnPlantService } from "./removeLikeOnPlantService";

export async function removeLikeOnPlantController(req: Request, res: Response) {
  const { plantId } = req.params;
  const { userId } = req;
  await removeLikeOnPlantService(Number(plantId), userId);
  return res.send();
}
