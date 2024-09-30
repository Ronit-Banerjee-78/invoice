import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { JWTGenerator } from "../Utils/JWTGenerator.js";

// get User Details

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: "Error While Fetching User Data" });
  }
};

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
      httpOnly: true,
      sameSite: "strict",
    });

    // Remove the password field before returning the user object
    const { password: removedPassword, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "User sign up successfully",
      success: true,
      user: userWithoutPassword, // password is excluded here
      token, // token is sent back to the frontend
    });
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

    // console.log(req.body);

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
      httpOnly: true,
      sameSite: "strict",
    });

    // Remove the password field before returning the user object
    const { password: removedPassword, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: userWithoutPassword, // password is excluded here
      token, // token is sent back to the frontend
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during User Log in", error: error.message });
  }
};

// update User Profile

export const updateUserProfile = async (req, res) => {
  const { email, username, password } = req.body;
  // console.log("Request Body", req.body);

  // console.log("-------------------------------");

  try {
    const user = await User.findOne({ email });
    // console.log("Found User", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const updatedUserData = {
      email,
      username,
      password: hashedPassword,
    };

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updatedUserData,
      {
        new: true,
      }
    );
    // console.log("-------------------------------");
    // console.log("Updated User ", updatedUser);

    // Remove the password field before returning the user object
    const { password: removedPassword, ...userWithoutPassword } = user._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// refresh token

export const refreshToken = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = JWTGenerator(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error While regenerating refresh token" });
  }
};

// log out

export const logoutUser = async (req, res) => {
  req.user = null;
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
    sameSite: "strict",
  });
  // console.log(res);
  res.status(200).json({ message: "Logout successful" });
};
