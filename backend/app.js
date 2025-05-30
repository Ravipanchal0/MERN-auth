import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(cookieParser());

// Router setup
import authRouter from "./router/userRouter.js";

app.use("/api/user", authRouter);

app.use(errorHandler);

export default app;
