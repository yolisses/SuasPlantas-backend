import { Router } from "express";
import { PlantController } from "./PlantController";
import { authMiddleware } from "auth/authMiddleware";

export const plantsRoutes = Router();

plantsRoutes.get("/", PlantController.get);
plantsRoutes.get("/all", PlantController.getAll);
plantsRoutes.get("/:id", PlantController.getOne);
plantsRoutes.delete("/:id", PlantController.remove);
plantsRoutes.patch("/", authMiddleware, PlantController.edit);
plantsRoutes.post("/", authMiddleware, PlantController.create);
plantsRoutes.get(
  "/image-link",
  authMiddleware,
  PlantController.getImageUploadLink
);
