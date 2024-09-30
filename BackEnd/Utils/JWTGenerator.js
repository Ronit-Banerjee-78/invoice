import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "../env",
});

export const JWTGenerator = (_id) => {
  return jwt.sign({ _id }, process.env.JSON_WEB_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
