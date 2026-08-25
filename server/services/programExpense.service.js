import ProgramExpense from "../models/programExpense.model.js";
import ProgramExpenseItem from "../models/programExpenseItem.model.js";

/*
========================================
HELPER - UPDATE PROGRAM STATUS
========================================
*/
const updateProgramStatus = async (programExpenseId) => {
  const program = await ProgramExpense.findById(
    programExpenseId
  );

  if (!program) {
    return null;
  }

  const approvedExpenses =
    await ProgramExpenseItem.find({
      programExpense: programExpenseId,
      status: "Approved",
    });

  const totalApprovedExpense =
    approvedExpenses.reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );

  const advanceAmount =
    Number(program.advanceAmount || 0);

  const returnedAmount =
    Number(program.returnedAmount || 0);

  const totalSettled =
    totalApprovedExpense + returnedAmount;

  program.totalExpense =
    totalApprovedExpense;

  program.remainingAmount = Math.max(
    advanceAmount - totalSettled,
    0
  );

  // ================================
  // STATUS
  // ================================

  if (
    advanceAmount > 0 &&
    totalSettled >= advanceAmount
  ) {
    program.status = "Completed";
  } else if (totalSettled > 0) {
    program.status = "In Progress";
  } else {
    program.status = "Pending";
  }

  await program.save();

  return program;
};


/*
========================================
ADMIN - CREATE PROGRAM EXPENSE
========================================
*/
export const createProgramExpenseService = async ({
  staff,
  programName,
  programDate,
  location,
  description,
  advanceAmount,
  createdBy,
}) => {
  if (
    !staff ||
    !programName ||
    !programDate ||
    !location ||
    advanceAmount === undefined
  ) {
    return {
      success: false,
      statusCode: 400,
      message: "All required fields are required.",
    };
  }

  const amount = Number(advanceAmount);

  if (amount <= 0) {
    return {
      success: false,
      statusCode: 400,
      message: "Advance amount must be greater than 0.",
    };
  }

  const programExpense =
    await ProgramExpense.create({
      staff,
      programName,
      programDate,
      location,
      description,
      advanceAmount: amount,
      totalExpense: 0,
      remainingAmount: amount,
      returnedAmount: 0,
      status: "Pending",
      createdBy,
    });

  return {
    success: true,
    statusCode: 201,
    message: "Program created successfully.",
    data: programExpense,
  };
};


/*
========================================
ADMIN - GET ALL PROGRAM EXPENSES
========================================
*/
export const getAllProgramExpensesService =
  async () => {
    const programs =
      await ProgramExpense.find()
        .populate(
          "staff",
          "employeeId name email department"
        )
        .populate(
          "createdBy",
          "name email"
        )
        .sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: programs,
    };
  };


/*
========================================
GET SINGLE PROGRAM EXPENSE
========================================
*/
export const getProgramExpenseByIdService =
  async (id) => {
    const program =
      await ProgramExpense.findById(id)
        .populate(
          "staff",
          "employeeId name email department"
        )
        .populate(
          "createdBy",
          "name email"
        );

    if (!program) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Program expense not found.",
      };
    }

    const expenses =
      await ProgramExpenseItem.find({
        programExpense: id,
      })
        .populate(
          "staff",
          "employeeId name email"
        )
        .populate(
          "verifiedBy",
          "name email"
        )
        .sort({
          expenseDate: -1,
        });

    return {
      success: true,
      statusCode: 200,
      data: {
        program,
        expenses,
      },
    };
  };


/*
========================================
STAFF - GET MY PROGRAMS
========================================
*/
export const getMyProgramExpensesService =
  async (staffId) => {
    const programs =
      await ProgramExpense.find({
        staff: staffId,
      })
        .populate(
          "createdBy",
          "name email"
        )
        .sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: programs,
    };
  };


/*
========================================
STAFF - ADD EXPENSE
========================================
*/
export const addProgramExpenseItemService =
  async ({
    programExpense,
    staff,
    expenseDate,
    category,
    description,
    amount,
  }) => {
    if (
      !programExpense ||
      !staff ||
      !expenseDate ||
      !category ||
      !description ||
      amount === undefined
    ) {
      return {
        success: false,
        statusCode: 400,
        message:
          "All expense fields are required.",
      };
    }

    const expenseAmount = Number(amount);

    if (expenseAmount <= 0) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Expense amount must be greater than 0.",
      };
    }

    const program =
      await ProgramExpense.findById(
        programExpense
      );

    if (!program) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Program expense not found.",
      };
    }

    // Check assigned staff
    if (
      program.staff.toString() !==
      staff.toString()
    ) {
      return {
        success: false,
        statusCode: 403,
        message:
          "You are not assigned to this program.",
      };
    }

    // Do not allow expense after completion
    if (program.status === "Completed") {
      return {
        success: false,
        statusCode: 400,
        message:
          "This program is already completed.",
      };
    }

    // Calculate approved amount already used
    const approvedExpenses =
      await ProgramExpenseItem.find({
        programExpense,
        status: "Approved",
      });

    const approvedAmount =
      approvedExpenses.reduce(
        (total, item) =>
          total + Number(item.amount || 0),
        0
      );

    const remaining =
      Number(program.advanceAmount) -
      approvedAmount;

    // Do not allow submitted expense
    // greater than remaining advance
    if (expenseAmount > remaining) {
      return {
        success: false,
        statusCode: 400,
        message: `Expense amount cannot be greater than remaining amount ₹${remaining}.`,
      };
    }

    const expenseItem =
      await ProgramExpenseItem.create({
        programExpense,
        staff,
        expenseDate,
        category,
        description,
        amount: expenseAmount,
        status: "Pending",
        adminRemark: "",
        verifiedBy: null,
        verifiedAt: null,
      });

    /*
    IMPORTANT:
    Staff submission itself does NOT make
    expense approved.

    Program remains Pending until admin
    approves an expense.
    */

    return {
      success: true,
      statusCode: 201,
      message:
        "Expense submitted successfully.",
      data: expenseItem,
    };
  };


/*
========================================
STAFF - GET MY EXPENSES
========================================
*/
export const getMyProgramExpenseItemsService =
  async (
    programExpense,
    staffId
  ) => {
    const program =
      await ProgramExpense.findById(
        programExpense
      );

    if (!program) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Program expense not found.",
      };
    }

    if (
      program.staff.toString() !==
      staffId.toString()
    ) {
      return {
        success: false,
        statusCode: 403,
        message:
          "You are not assigned to this program.",
      };
    }

    const expenses =
      await ProgramExpenseItem.find({
        programExpense,
        staff: staffId,
      })
        .populate(
          "verifiedBy",
          "name email"
        )
        .sort({
          expenseDate: -1,
        });

    return {
      success: true,
      statusCode: 200,
      data: {
        program,
        expenses,
      },
    };
  };


/*
========================================
ADMIN - APPROVE / REJECT EXPENSE
========================================
*/
export const updateProgramExpenseItemStatusService =
  async ({
    expenseId,
    status,
    adminRemark,
    verifiedBy,
  }) => {
    if (
      !["Approved", "Rejected"].includes(
        status
      )
    ) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Invalid expense status.",
      };
    }

    const expense =
      await ProgramExpenseItem.findById(
        expenseId
      );

    if (!expense) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Expense not found.",
      };
    }

    // Update expense status
    expense.status = status;

    expense.adminRemark =
      adminRemark || "";

    expense.verifiedBy =
      verifiedBy;

    expense.verifiedAt =
      new Date();

    await expense.save();

    // Recalculate entire program
    const program =
      await updateProgramStatus(
        expense.programExpense
      );

    return {
      success: true,
      statusCode: 200,
      message:
        `Expense ${status.toLowerCase()} successfully.`,
      data: {
        expense,
        program,
      },
    };
  };


/*
========================================
ADMIN - UPDATE RETURNED AMOUNT
========================================
*/
export const updateReturnedAmountService =
  async ({
    programExpenseId,
    returnedAmount,
  }) => {
    if (returnedAmount === undefined) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Returned amount is required.",
      };
    }

    const returned =
      Number(returnedAmount);

    if (returned < 0) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Returned amount cannot be negative.",
      };
    }

    const program =
      await ProgramExpense.findById(
        programExpenseId
      );

    if (!program) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Program expense not found.",
      };
    }

    /*
    Get approved expenses
    */
    const approvedExpenses =
      await ProgramExpenseItem.find({
        programExpense:
          programExpenseId,
        status: "Approved",
      });

    const totalApprovedExpense =
      approvedExpenses.reduce(
        (total, item) =>
          total + Number(item.amount || 0),
        0
      );

    const advanceAmount =
      Number(program.advanceAmount || 0);

    /*
    Maximum amount that can be returned
    */
    const remaining =
      Math.max(
        advanceAmount -
          totalApprovedExpense,
        0
      );

    if (returned > remaining) {
      return {
        success: false,
        statusCode: 400,
        message:
          `Returned amount cannot be greater than remaining amount ₹${remaining}.`,
      };
    }

    program.returnedAmount =
      returned;

    if (returned > 0) {
      program.returnedDate =
        new Date();
    } else {
      program.returnedDate =
        null;
    }

    /*
    Calculate final settlement
    */

    const totalSettled =
      totalApprovedExpense +
      returned;

    program.totalExpense =
      totalApprovedExpense;

    program.remainingAmount =
      Math.max(
        advanceAmount -
          totalSettled,
        0
      );

    /*
    STATUS
    */

    if (
      totalSettled >= advanceAmount &&
      advanceAmount > 0
    ) {
      program.remainingAmount = 0;
      program.status = "Completed";
    } else if (
      totalApprovedExpense > 0 ||
      returned > 0
    ) {
      program.status = "In Progress";
    } else {
      program.status = "Pending";
    }

    await program.save();

    return {
      success: true,
      statusCode: 200,
      message:
        "Returned amount updated successfully.",
      data: program,
    };
  };