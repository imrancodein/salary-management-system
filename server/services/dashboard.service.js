import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import Attendance from "../models/attendance.model.js";
import Leave from "../models/leave.model.js";
import Salary from "../models/salary.model.js";
import EOD from "../models/eod.model.js";

export const getAdminDashboardService = async () => {

  
const today = new Date()
const todayString = today
  .toISOString()
  .split("T")[0];

// Present Today
const presentToday = await Attendance.countDocuments({
  status: "Present",
  date: todayString,
});

// Absent Today
const absentToday = await Attendance.countDocuments({
  status: "Absent",
  date: todayString,
});

// Half Day
const halfDayToday = await Attendance.countDocuments({
  status: "Half Day",
  date: todayString,
});


  // Pending Leave
  const pendingLeave =
    await Leave.countDocuments({
      status: "Pending",
    });

  // Total Salary
  const totalSalary =
    await Salary.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$netSalary",
          },
        },
      },
    ]);
// Total Staff
  const totalStaff = await User.countDocuments({
    role: "staff",
  });

  // Total Department
  const totalDepartment =
    await Department.countDocuments();

  // New Staff This Month
  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const newStaff =
    await User.countDocuments({
      role: "staff",
      createdAt: {
        $gte: firstDay,
      },
    });

  return {

    totalStaff,

    totalDepartment,

    presentToday,

    absentToday,

    pendingLeave,

    pendingEOD: 0,

    totalSalary:
      totalSalary.length > 0
        ? totalSalary[0].total
        : 0,

    newStaff,

  };

};