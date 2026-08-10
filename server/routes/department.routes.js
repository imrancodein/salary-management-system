import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  addDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addDepartment);

router.get("/", authMiddleware, getAllDepartments);

router.put("/:id", authMiddleware, updateDepartment);

router.delete("/:id", authMiddleware, deleteDepartment);

export default router;