import { Router } from "express";

import { authRoutes } from "auth/authRoutes";
import { likeRoutes } from "like/likeRoutes";
import { userRoutes } from "user/userRoutes";
import { plantsRoutes } from "plant/plantRoutes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/like", likeRoutes);
routes.use("/users", userRoutes);
routes.use("/plants", plantsRoutes);
