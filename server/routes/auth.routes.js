import express from "express";
import {
  login,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Login
router.post("/login", login);

// Logged In User
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Change Password
router.put("/change-password", authMiddleware, changePassword);

// Forgot Password
router.post("/forgot-password", forgotPassword);
// Reset password

router.post("/reset-password/:token", resetPassword);

export default router;