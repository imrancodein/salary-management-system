import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";

const router = express.Router();

router.post("/apply", authMiddleware, applyLeave);

router.get("/my", authMiddleware, getMyLeaves);

router.get("/", authMiddleware, getAllLeaves);

router.put("/:id", authMiddleware, updateLeaveStatus);

export default router;