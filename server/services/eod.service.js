import EOD from "../models/eod.model.js";
import User from "../models/user.model.js";

export const getMonthlyEODReportService = async (
  staffId,
  month,
  year
) => {

  const employee = await User.findById(staffId)
    .populate("department", "departmentName");

  if (!employee) {
    throw new Error("Employee not found");
  }

  const monthString = month.toString().padStart(2, "0");

  const records = await EOD.find({
    staff: staffId,
    date: {
      $regex: `^${year}-${monthString}`,
    },
  }).sort({ date: 1 });

  const submittedDays = records.length;

  const manualEntries = records.filter(
    (item) => item.isManual
  ).length;

  return {

    employee: {
      name: employee.name,
      employeeId: employee.employeeId,
      department:
        employee.department?.departmentName || "-",
    },

    summary: {
      submittedDays,
      manualEntries,
    },

    records,

  };

};

// getTodayEODService
export const getTodayEODService = async (userId) => {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const eod = await EOD.findOne({
    staff: userId,
    date: today,
  });

  return {
    success: true,
    statusCode: 200,
    data: eod,
  };
};

// Sunday Validation

// const today = new Date();

// if (today.getDay() === 0) {

//     throw new Error(
//         "EOD submission is not required on Sunday."
//     );

// }