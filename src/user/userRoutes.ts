import { authMiddleware } from "auth/authMiddleware";
import { Router } from "express";
import { UserController } from "./UserController";

export const userRoutes = Router();

userRoutes.get("/:id", UserController.getOne);
userRoutes.patch("/", authMiddleware, UserController.edit);
userRoutes.patch("/edit-location", authMiddleware, UserController.editLocation);
userRoutes.delete("/:id", authMiddleware, UserController.remove);
userRoutes.get("/:userId/plants", UserController.getPlants);
