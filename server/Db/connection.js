import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = mongoose.connect(
      `${process.env.MONGODB_URL}`,{ useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log("MongoDB Connection error : ", error);
    process.exit(1);
  }
};

export default connectDB;
