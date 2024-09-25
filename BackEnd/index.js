import express from "express";
import dotenv from "dotenv";
import connectDB from "./Db/connection.js";
const PORT = process.env.PORT;
import InvoiceRoutes from "./Routes/InvoiceRoutes.js";
import UserRoutes from "./Routes/UserRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
// {
//     // "https://invoicely-mern-fm.vercel.app/
//   }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({
  path: "./env",
});

// routes middleware

app.use("/api/user", UserRoutes);
app.use("/api/invoices", InvoiceRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
