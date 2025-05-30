import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const ORIGIN = process.env.ORIGIN;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const MONGODB_URL = process.env.MONGODB_URL;
