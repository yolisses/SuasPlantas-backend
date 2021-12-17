import { Request, Response } from 'express';
import { removeLikeOnPlantService } from './removeLikeOnPlantService';

export async function removeLikeOnPlantController(req: Request, res: Response) {
  const { plantId } = req.params;
  const { userId } = req.session;
  await removeLikeOnPlantService(Number(plantId), userId);
  return res.send();
}
