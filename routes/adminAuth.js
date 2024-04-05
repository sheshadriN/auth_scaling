import express from "express";
import RegisterOtp from "../controller/register.js";

const router = express.Router();

router.post("/RegisterOtp", RegisterOtp);

export default router;
