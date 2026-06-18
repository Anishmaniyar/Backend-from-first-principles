import express from "express";
import { authencticatedUser } from "../controllers/auth.controllers";
const router = express.Router();

router.post("/login", loginUser);

router.get("/profile", authencticatedUser, getProfile);

export default router;
