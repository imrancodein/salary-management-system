import {
  checkInService,
  checkOutService,
  getTodayAttendanceService,
  getAttendanceHistoryService,
  getAttendanceSummaryService,
} from "../services/attendance.service.js";
import Attendance from "../models/attendance.model.js";
// ==========================
// CHECK IN
// ==========================
export const checkIn = async (req, res) => {
  try {
    const result = await checkInService(
      req.user._id,
      req.body.location
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// CHECK OUT
// ==========================
export const checkOut = async (req, res) => {
  try {
    const result = await checkOutService(req.user._id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// TODAY ATTENDANCE
// ==========================
export const getTodayAttendance = async (req, res) => {
  try {
    const result = await getTodayAttendanceService(
      req.user._id
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Attendance History
export const getAttendanceHistory = async (req, res) => {
  try {
    const result = await getAttendanceHistoryService(req.user.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// summary
export const getAttendanceSummary = async (req, res) => {
  try {
    const result = await getAttendanceSummaryService(
      req.user.id
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GetAllAttandance 
export const getAllAttendance = async (req, res) => {
  try {

 const attendance = await Attendance.find()
  .populate({
    path: "staff",
    populate: {
      path: "department",
      select: "name",
    },
  })
  .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: attendance,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Manual attendance 
export const addManualAttendance = async (req, res) => {
  try {
    const {
      staff,
      date,
      checkIn,
      checkOut,
      status,
      reason,
    } = req.body;

    // Duplicate Check
    const existing = await Attendance.findOne({
      staff,
      date,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Attendance already exists for this date.",
      });
    }

    let workingHours = 0;

    if (checkIn && checkOut) {
      const inTime = new Date(`${date}T${checkIn}`);
      const outTime = new Date(`${date}T${checkOut}`);

      workingHours = (
        (outTime - inTime) /
        (1000 * 60 * 60)
      ).toFixed(2);
    }

    const attendance = await Attendance.create({
      staff,
      date,
      checkIn: checkIn
        ? new Date(`${date}T${checkIn}`)
        : null,
      checkOut: checkOut
        ? new Date(`${date}T${checkOut}`)
        : null,
      workingHours,
      status,
      reason,
      location: null,
      timestamp: new Date(),
      isManual: true,
      manualBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Attendance Added Successfully",
      data: attendance,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};