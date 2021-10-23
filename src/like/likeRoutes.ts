import { authMiddleware } from "auth/authMiddleware";
import { Router } from "express";
import { giveLikeToPlantController } from "./giveLikeToPlantController";
import { removeLikeOnPlantController } from "./removeLikeOnPlantController";

export const likeRoutes = Router();

likeRoutes.post("/:plantId", authMiddleware, giveLikeToPlantController);
likeRoutes.delete("/:plantId", authMiddleware, removeLikeOnPlantController);
