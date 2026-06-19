import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { protectedController } from "../auth.controller.js";
const router = express.Router();

router.post("/login");

router.get("/public");

router.get("/protected", authMiddleware, protectedController);

router.get("/dashboard", authMiddleware);

export default router;
