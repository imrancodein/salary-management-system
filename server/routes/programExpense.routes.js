import express from "express";

import {
  createProgramExpense,
  getAllProgramExpenses,
  getProgramExpenseById,
  getMyProgramExpenses,
  addProgramExpenseItem,
  getMyProgramExpenseItems,
  updateProgramExpenseItemStatus,
  updateReturnedAmount,
} from "../controllers/programExpense.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

/*
========================================
STAFF ROUTES
========================================
*/

// Get My Programs
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("staff"),
  getMyProgramExpenses
);

// Get My Expenses of a Program
router.get(
  "/my/:programExpenseId",
  authMiddleware,
  roleMiddleware("staff"),
  getMyProgramExpenseItems
);

// Add Expense
router.post(
  "/expense",
  authMiddleware,
  roleMiddleware("staff"),
  addProgramExpenseItem
);


/*
========================================
ADMIN ROUTES
========================================
*/

// Create Program Expense
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createProgramExpense
);

// Get All Program Expenses
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllProgramExpenses
);

// Approve / Reject Expense
router.put(
  "/expense/:expenseId/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateProgramExpenseItemStatus
);

// Update Returned Amount
router.put(
  "/:id/returned",
  authMiddleware,
  roleMiddleware("admin"),
  updateReturnedAmount
);

// Get Single Program + All Expenses
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getProgramExpenseById
);

export default router;