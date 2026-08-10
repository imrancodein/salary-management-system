import express from "express";

import { getAdminDashboard } from "../controllers/dashboard.controller.js";

// import authMiddleware from "../middlewares/authMiddleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAdminDashboard
);

export default router;