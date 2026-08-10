import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import {
  submitEOD,
  getMyEOD,
  getAllEOD,
   getMonthlyEODReport,
   getTodayEOD,
} from "../controllers/eod.controller.js";

const router = express.Router();

// ============================
// Staff
// ============================

// Submit EOD
router.post(
  "/",
  authMiddleware,
  submitEOD
);

// My EOD
router.get(
  "/my",
  authMiddleware,
  getMyEOD
);

// ============================
// Admin
// ============================

// All EOD
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllEOD
);
// getMontlyEOD
router.get(
  "/report/:staffId",
  authMiddleware,
  adminMiddleware,
  getMonthlyEODReport
);
// getTodayEOD
router.get(
  "/today",
  authMiddleware,
  getTodayEOD
);
export default router;