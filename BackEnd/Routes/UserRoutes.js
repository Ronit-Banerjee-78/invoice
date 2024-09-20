import express from "express";
import { signupUser, loginUser } from "../Controllers/UserAuthController.js";

const router = express.Router();

// POST Sign up
router.post("/signup", signupUser);

// POST Log in
router.post("/login", loginUser);

export default router;
