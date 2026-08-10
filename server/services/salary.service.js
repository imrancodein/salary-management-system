import Salary from "../models/salary.model.js";

// ==============================
// Generate Salary
// ==============================
export const generateSalaryService = async (salaryData) => {
  try {
    const {
      staff,
      month,
      year,
      basicSalary,
      bonus = 0,
      deduction = 0,
    } = salaryData;

    // Duplicate Check
    const existingSalary = await Salary.findOne({
      staff,
      month,
      year,
    });

    if (existingSalary) {
      return {
        success: false,
        statusCode: 400,
        message: "Salary already generated for this month.",
      };
    }

    // Calculate Net Salary
    const netSalary =
      Number(basicSalary) +
      Number(bonus) -
      Number(deduction);

    // Save Salary
    const salary = await Salary.create({
      staff,
      month,
      year,
      basicSalary,
      bonus,
      deduction,
      netSalary,
      status: "Unpaid",
    });

    return {
      success: true,
      statusCode: 201,
      message: "Salary generated successfully.",
      data: salary,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }
};

// ==============================
// Get All Salary
// ==============================

export const getAllSalaryService = async () => {
  try {
    const salaries = await Salary.find()
      .populate({
        path: "staff",
        select: "name employeeId basicSalary department",
        populate: {
          path: "department",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: salaries,
    };
  } catch (error) {
    console.log("Salary Fetch Error:", error);

    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }
};


// marksalary
export const markSalaryPaidService = async (
  salaryId,
  paymentMode,
  adminId
) => {
  try {

    const salary = await Salary.findById(salaryId);

    if (!salary) {
      return {
        success: false,
        statusCode: 404,
        message: "Salary not found.",
      };
    }

    if (salary.status === "Paid") {
      return {
        success: false,
        statusCode: 400,
        message: "Salary already paid.",
      };
    }

    salary.status = "Paid";
    salary.paymentMode = paymentMode;
    salary.paymentDate = new Date();
    salary.paidBy = adminId;

    await salary.save();

    return {
      success: true,
      statusCode: 200,
      message: "Salary marked as Paid.",
      data: salary,
    };

  } catch (error) {

    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };

  }
};

// getmysalary  
export const getMySalaryService = async (userId) => {
  try {

    const salary = await Salary.find({
      staff: userId,
    })
      .populate("staff")
      .sort({
        year: -1,
        createdAt: -1,
      });

    return {
      success: true,
      statusCode: 200,
      data: salary,
    };

  } catch (error) {

    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };

  }
};