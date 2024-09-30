import express from "express";
import {
  getUser,
  signupUser,
  loginUser,
  updateUserProfile,
  refreshToken,
  logoutUser,
} from "../Controllers/UserAuthController.js";

const router = express.Router();

// POST Sign up User
router.post("/signup", signupUser);

// POST Log in User
router.post("/login", loginUser);

// Get User
router.get("/profile/:id", getUser);

// POST Update UserProfile
router.post("/update-profile", updateUserProfile);

// POST Refresh token
router.post("/refresh-token", refreshToken);

// POST Log out User
router.post("/logout", logoutUser);

export default router;
