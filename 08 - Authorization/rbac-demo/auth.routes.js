import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { getProfile, loginUser } from "./controllers/profileController.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.get("/admin-panel", authMiddleware, authorize("admin"), adminController);
router.get(
  "/mod-lounge",
  authMiddleware,
  authorize("admin", "moderator"),
  modController,
);

export default router;
