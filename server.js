import dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";

import morgan from "morgan";
import adminAuth from "./routes/adminAuth.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/admin", adminAuth);

import "./db.js";
app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
