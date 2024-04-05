import dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";

import morgan from "morgan";
import adminAuth from "./routes/adminAuth.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/admin", adminAuth);

app.listen(3000, () => {
  console.log(`server is running http://localhost:3000`);
});
