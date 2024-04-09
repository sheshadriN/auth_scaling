import dotenv from "dotenv";
import morgan from "morgan";
import adminAuth from "./routes/adminAuth.js";
import express, { Router } from "express";
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/admin", adminAuth);

app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
