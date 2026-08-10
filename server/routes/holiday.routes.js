import express from "express";

import {
  createHoliday,
  getAllHoliday,
  getHolidayById,
  updateHoliday,
  deleteHoliday,
} from "../controllers/holiday.controller.js";

import  verifyToken  from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

// Create Holiday
router.post(
  "/",
  verifyToken,
  roleMiddleware("admin"),
  createHoliday
);

// Get All Holidays
router.get(
  "/",
  verifyToken,
  getAllHoliday
);

// Get Single Holiday
router.get(
  "/:id",
  verifyToken,
  getHolidayById
);

// Update Holiday
router.put(
  "/:id",
  verifyToken,
 roleMiddleware("admin"),
  updateHoliday
);

// Delete Holiday
router.delete(
  "/:id",
  verifyToken,
  roleMiddleware("admin"),
  deleteHoliday
);

export default router;