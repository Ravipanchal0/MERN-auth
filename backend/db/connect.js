import mongoose from "mongoose";
import { MONGODB_URL } from "../config/config.js";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL);
    console.log("Mongodb connected at host : ", conn.connection.host);
  } catch (error) {
    console.log("Mongodb connection failed : ", error.message);
    process.exit(1);
  }
};

export default connectDb;
