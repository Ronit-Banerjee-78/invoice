import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

dotenv.config({
  path: "./env",
});

export const UserAuthMiddleware = async (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.split(" ")[1]) || req.cookies.token;
  // the reason i am checking the existence of token in both authHeader and request cookie is because if the user is already logged in and data hasn't been changed then the singleInvoice hook won't get triggered and we will get the cached data from the hook. meaning that no backend query that means we have to get token from request cookie.
  // Token is usually prefixed by 'Bearer'
  // console.log("Token in middleware", token);
  const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
  // console.log("Decoded ", decoded);
  const userId = decoded._id;
  // console.log("User ID from middleware", userId);

  if (!token) {
    return res
      .status(401)
      .json({ message: "You are unauthorized to access the resources" });
  }

  // Verify the token
  jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    try {
      const user = await User.findById(userId);
      // console.log("-----------------------------------------------------");
      // console.log("Middleware User", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; // Add user data to the request
      next(); // Proceed to the next middleware
    } catch (error) {
      return res.status(500).json({ message: "Error fetching user data" });
    }
  });
};
