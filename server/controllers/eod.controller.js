import EOD from "../models/eod.model.js";
import {
  getMonthlyEODReportService,
  getTodayEODService,
} from "../services/eod.service.js";
// ============================
// Staff Submit EOD
// ============================

export const submitEOD = async (req, res) => {

  try {

    const {
      date,
      todayWork,
      tomorrowPlan,
    } = req.body;

    // Validation
    if (
      !date ||
      !todayWork 
    
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Same day duplicate check
    const alreadySubmitted =
      await EOD.findOne({
        staff: req.user.id,
        date,
      });

    if (alreadySubmitted) {
      return res.status(400).json({
        success: false,
        message:
          "EOD already submitted for today",
      });
    }

    const eod = await EOD.create({
      staff: req.user.id,
      date,
      todayWork,
      tomorrowPlan,
    });

    res.status(201).json({
      success: true,
      message: "EOD submitted successfully",
      data: eod,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ============================
// Staff My EOD
// ============================

export const getMyEOD = async (
  req,
  res
) => {

  try {

    const eods = await EOD.find({
      staff: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: eods,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ============================
// Admin All EOD
// ============================

export const getAllEOD = async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  try {

    const eods = await EOD.find()
      .populate(
        "staff",
        "name employeeId department"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: eods,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// getMonthlyEOD
export const getMonthlyEODReport = async (
  req,
  res
) => {

  try {

    const { staffId } = req.params;

    const { month, year } = req.query;

    if (!month || !year) {

      return res.status(400).json({
        success: false,
        message:
          "Month and Year are required",
      });

    }

    const report =
      await getMonthlyEODReportService(
        staffId,
        month,
        year
      );

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// getTodayEOD
export const getTodayEOD = async (req, res) => {
  try {
    const result = await getTodayEODService(
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