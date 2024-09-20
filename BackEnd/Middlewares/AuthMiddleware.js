import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

dotenv.config({
  path: "./env",
});
export const UserAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "You are unauthorized to access the resources" });
  }

  jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET, async (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error while verifying token",
      });
    } else {
      const user = await User.findById(data._id);
      if (user) {
        req.user = user;
        next(); // Continue to the next middleware or route handler
      } else {
        return res.status(404).json({ message: "Could not find the user" });
      }
    }
  });
};
