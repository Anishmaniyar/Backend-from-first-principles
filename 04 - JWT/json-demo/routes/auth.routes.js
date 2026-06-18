import express from "express";
const router = express.Router();

import {
  loginUser,
  getProfile,
  verifyUser,
  authenticatedToken,
} from "../controllers/auth.controllers";

router.post("/login", loginUser);

router.get("/verify", authenticatedToken, verifyUser);

router.get("/profile", authenticatedToken, getProfile);

export default router;
