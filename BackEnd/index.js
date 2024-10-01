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
const ALLOWED_ORIGINS = [
  "https://invoicely-mern.vercel.app",
  "https://localhost:5173",
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
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
