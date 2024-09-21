import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { JWTGenerator } from "../Utils/JWTGenerator.js";

// sign up
export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ message: "All fileds are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      username,
    });

    await user.save();

    const token = JWTGenerator(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.status(201).json({ message: "User signed in successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during User Sign up", error: error.message });
  }
};

// log in

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All fileds are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Incorrect user credentials" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect user credentials" });
    }

    const token = JWTGenerator(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    // Remove the password field before returning the user object
    const { password: removedPassword, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: userWithoutPassword, // password is excluded here
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during User Log in", error: error.message });
  }
};

// log out

export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successful" });
};
