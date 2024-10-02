import express from "express";
import dotenv from "dotenv";
import connectDB from "./Db/connection.js";
import InvoiceRoutes from "./Routes/InvoiceRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT;
// const ALLOWED_ORIGINS = [
//   "https://invoicely-mern.vercel.app",
//   "http://localhost:5173",
// ];

// CORS middleware
app.options("*", cors()); // include before other routes

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://invoicely-mern.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes middleware
app.use("/api/user", UserRoutes);
app.use("/api/invoices", InvoiceRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
