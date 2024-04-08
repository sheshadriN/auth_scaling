import express from "express";
import register from "../controller/register.js";

const router = express.Router();

router.post("/getOtp", register.getOtp);
router.post("/register",register.register)

export default router;
