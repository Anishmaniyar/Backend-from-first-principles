import express from "express";
// Add .js to the file path here
import {
  getProfile,
  getrefreshToken,
  loginUser,
  logoutUser,
  authenticatedUser,
} from "./auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", authenticatedUser, getProfile);
router.get("/refresh", getrefreshToken);
router.post("/logout", logoutUser);

export default router; // Ensure you export the router at the bottom!
