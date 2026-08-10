import Attendance from "../models/attendance.model.js";
import calculateDistance from "../utils/calculateDistance.js";
import Holiday from "../models/holiday.model.js";
import EOD from "../models/eod.model.js";
// import calculateDistance from "../utils/calculateDistance.js";
// ==============================
// CHECK IN
// ==============================
export const checkInService = async (userId,location) => {
  // Today's Date
  const today = new Date().toISOString().split("T")[0];
// Sunday Check

const currentDate = new Date();

if (currentDate.getDay() === 0) {

  return {

    success: false,

    statusCode: 400,

    message: "Today is Sunday. Attendance is disabled.",

  };

}

// Holiday Check

const holiday = await Holiday.findOne({
  date: today,
});

if (holiday) {

  return {

    success: false,

    statusCode: 400,

    message: `Today is Holiday (${holiday.name}). Attendance is disabled.`,

  };

}
  // Check today's attendance
  const existingAttendance = await Attendance.findOne({
    staff: userId,
    date: today,
  });

  if (existingAttendance) {
    return {
      success: false,
      statusCode: 400,
      message: "You have already checked in today.",
    };
  }

  // Attendance Timing
  const now = new Date();

const hour = now.getHours();

const minute = now.getMinutes();

const totalMinutes = hour * 60 + minute;

let status = "Present";

// 10:30 AM = 630 Minutes

if (totalMinutes > 630) {

  status = "Late";

}

// 12:30 PM = 750 Minutes

if (totalMinutes > 750) {

  status = "Half Day";

}
// GPS
const officeLatitude = Number(process.env.OFFICE_LATITUDE);

const officeLongitude = Number(process.env.OFFICE_LONGITUDE);

const officeRadius = Number(process.env.OFFICE_RADIUS);

let locationData = {};

if (location) {

    const distance = calculateDistance(

        officeLatitude,

        officeLongitude,

        location.latitude,

        location.longitude

    );

    locationData = {

        type:
            distance <= officeRadius
                ? "Office"
                : "Field",

        latitude: location.latitude,

        longitude: location.longitude,

        distance,

        address: "",

    };

}
  // Create attendance

const attendance = await Attendance.create({
  staff: userId,
  date: today,
  checkIn: new Date(),
  status,

  location: locationData,
});

  return {
    success: true,
    statusCode: 201,
    message: "Check In successful.",
    data: attendance,
  };
};

// ==============================
// CHECK OUT
// ==============================
export const checkOutService = async (userId) => {

  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({
    staff: userId,
    date: today,
  });

  if (!attendance) {
    return {
      success: false,
      statusCode: 404,
      message: "Please Check In First.",
    };
  }
  // Check EOD Submitted
const eod = await EOD.findOne({
  staff: userId,
  date: today,
});

if (!eod) {
  return {
    success: false,
    statusCode: 400,
    message: "Please submit EOD before checkout.",
  };
}
if (attendance.checkOut) {
  return {
    success: false,
    statusCode: 400,
    message: "You have already checked out.",
  };
}
  // 👇 नया Safety Check
  if (!attendance.checkIn) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid Attendance Record.",
    };
  }

  if (attendance.checkOut) {
    return {
      success: false,
      statusCode: 400,
      message: "You have already checked out.",
    };
  }

  attendance.checkOut = new Date();

  const diff =
    attendance.checkOut.getTime() -
    attendance.checkIn.getTime();

  attendance.workingHours =
    Number((diff / (1000 * 60 * 60)).toFixed(2));

  await attendance.save();

  return {
    success: true,
    statusCode: 200,
    message: "Check Out Successful.",
    data: attendance,
  };

};

// ==============================
// TODAY ATTENDANCE
// ==============================
export const getTodayAttendanceService = async (
  userId
) => {
  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({
    staff: userId,
    date: today,
  });

  return {
    success: true,
    statusCode: 200,
    data: attendance,
  };
};

// getAttendanceHistoryService()
export const getAttendanceHistoryService = async (userId) => {
  const attendance = await Attendance.find({
    staff: userId,
  }).sort({ createdAt: -1 });

  return {
    success: true,
    statusCode: 200,
    data: attendance,
  };
};
// attandance service


export const getAttendanceSummaryService = async (staffId) => {
  try {
    const attendance = await Attendance.find({ staff: staffId });

    const present = attendance.filter(
      (item) => item.status === "Present"
    ).length;

    const absent = attendance.filter(
      (item) => item.status === "Absent"
    ).length;

    const halfDay = attendance.filter(
      (item) => item.status === "Half Day"
    ).length;

    const totalDays = attendance.length;

    const totalWorkingHours = attendance.reduce(
      (total, item) => total + (item.workingHours || 0),
      0
    );

    const attendancePercentage =
      totalDays > 0
        ? ((present / totalDays) * 100).toFixed(2)
        : 0;

    return {
      success: true,
      statusCode: 200,
      data: {
        present,
        absent,
        halfDay,
        totalDays,
        totalWorkingHours,
        attendancePercentage,
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }
};

// getallattandacne
export const getAllAttendance = async () => {
  const response = await API.get(
    "/attendance/all"
  );

  return response.data;
};
// Manualattendance
export const addManualAttendance = async (data) => {
  const response = await API.post(
    "/attendance/manual",
    data
  );

  return response.data;
};