import express from "express";
import {
  signupUser,
  loginUser,
  refreshToken,
  logoutUser,
} from "../Controllers/UserAuthController.js";

const router = express.Router();

// POST Sign up
router.post("/signup", signupUser);

// POST Log in
router.post("/login", loginUser);

// POST Refresh token
router.post("/refresh-token", refreshToken);

// POST Log out
router.post("/logout", logoutUser);

export default router;
