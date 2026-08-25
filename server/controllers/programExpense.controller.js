import {
  createProgramExpenseService,
  getAllProgramExpensesService,
  getProgramExpenseByIdService,
  getMyProgramExpensesService,
  addProgramExpenseItemService,
  getMyProgramExpenseItemsService,
  updateProgramExpenseItemStatusService,
  updateReturnedAmountService,
} from "../services/programExpense.service.js";

/*
========================================
ADMIN - CREATE PROGRAM
========================================
*/

export const createProgramExpense = async (req, res) => {
  try {
    const result = await createProgramExpenseService({
      ...req.body,
      createdBy: req.user._id,
    });

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error("Create Program Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
ADMIN - GET ALL PROGRAMS
========================================
*/

export const getAllProgramExpenses = async (req, res) => {
  try {
    const result =
      await getAllProgramExpensesService();

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error("Get Programs Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
ADMIN - GET SINGLE PROGRAM
WITH ALL EXPENSES
========================================
*/

export const getProgramExpenseById = async (req, res) => {
  try {
    const result =
      await getProgramExpenseByIdService(
        req.params.id
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error("Get Program Details Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
STAFF - GET MY PROGRAMS
========================================
*/

export const getMyProgramExpenses = async (req, res) => {
  try {
    const result =
      await getMyProgramExpensesService(
        req.user._id
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error("Get My Programs Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
STAFF - ADD EXPENSE
========================================
*/

export const addProgramExpenseItem = async (req, res) => {
  try {
    const result =
      await addProgramExpenseItemService({
        ...req.body,
        staff: req.user._id,
      });

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error("Add Expense Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
STAFF - GET EXPENSE DETAILS
========================================
*/

export const getMyProgramExpenseItems = async (
  req,
  res
) => {
  try {
    const result =
      await getMyProgramExpenseItemsService(
        req.params.programExpenseId,
        req.user._id
      );

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error(
      "Get My Expense Details Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
ADMIN - APPROVE / REJECT EXPENSE
========================================
*/

export const updateProgramExpenseItemStatus = async (
  req,
  res
) => {
  try {
    const result =
      await updateProgramExpenseItemStatusService({
        expenseId: req.params.expenseId,
        status: req.body.status,
        adminRemark: req.body.adminRemark,
        verifiedBy: req.user._id,
      });

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error(
      "Update Expense Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/*
========================================
ADMIN - UPDATE RETURNED AMOUNT
========================================
*/

export const updateReturnedAmount = async (
  req,
  res
) => {
  try {
    const result =
      await updateReturnedAmountService({
        programExpenseId: req.params.id,
        returnedAmount:
          req.body.returnedAmount,
      });

    return res
      .status(result.statusCode)
      .json(result);
  } catch (error) {
    console.error(
      "Update Returned Amount Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};