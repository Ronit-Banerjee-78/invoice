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

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

// app.options("*", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.sendStatus(204); // No Content
// });

const PORT = process.env.PORT;

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
