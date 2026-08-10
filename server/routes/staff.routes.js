import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
// import upload from "../middleware/upload.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { 
    addStaff,
     getAllStaff,
     updateStaff,
     deleteStaff,
    getProfile,
    updateProfile,
    } 
    from "../controllers/staff.controller.js";

const router = express.Router();

// Add Staff
router.post("/", authMiddleware, addStaff);
// Get Logged In Staff Profile
router.get("/profile", authMiddleware, getProfile);

// Update Logged In Staff Profile
router.put(
    "/profile", 
    authMiddleware,
    upload.single("profilePhoto"),
    updateProfile
);

// Get All Staff
router.get("/", authMiddleware, getAllStaff);
// Update Staff
router.put("/:id", authMiddleware, updateStaff);

// Delete Staff
router.delete("/:id", authMiddleware, deleteStaff);

export default router;