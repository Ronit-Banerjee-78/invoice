import express from "express";
import dotenv from "dotenv";
import connectDB from "./Db/connection.js";
const PORT = process.env.PORT;
import InvoiceRoutes from "./Routes/InvoiceRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config({
  path: "./env",
});

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    // "https://invoicely-mern.vercel.app/",
    credentials: true,
  })
);
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
