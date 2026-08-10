import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import verifyToken from "../middleware/auth.middleware.js";
import {
  checkIn,
  checkOut,
  getTodayAttendance,
  getAttendanceHistory,
  getAttendanceSummary,
  getAllAttendance,
  addManualAttendance
 
} from "../controllers/attendance.controller.js";

const router = express.Router();

// Check In
router.post("/check-in", authMiddleware, checkIn);

// Check Out
router.put("/check-out", authMiddleware, checkOut);

// Today Attendance
router.get("/today", authMiddleware, getTodayAttendance);

// Attendance History
router.get("/history", authMiddleware, getAttendanceHistory);

// summary
router.get( "/summary", verifyToken,  getAttendanceSummary);

// manual
router.get( "/all", authMiddleware, getAllAttendance);
router.post("/manual", authMiddleware, addManualAttendance);
export default router;