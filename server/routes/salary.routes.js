import express from "express";
import { generateSalary, getAllSalary,markSalaryPaid,getMySalary, } from "../controllers/salary.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate", generateSalary);
router.get("/", getAllSalary);
router.put("/:id/pay", authMiddleware, markSalaryPaid);
router.get("/my-salary", authMiddleware, getMySalary);
export default router;