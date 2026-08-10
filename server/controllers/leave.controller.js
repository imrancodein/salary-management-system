import Leave from "../models/leave.model.js";

import User from "../models/user.model.js";
// ================================
// Apply Leave (Staff)
// ================================
export const applyLeave = async (req, res) => {
  try {

    const {
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const leave = await Leave.create({
      staff: user._id,
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Leave Applied Successfully",
      data: leave,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================================
// Staff Leave History
// ================================
export const getMyLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find({
      staff: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: leaves,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================================
// Admin All Leave List
// ================================
export const getAllLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find()

      .populate({
        path: "staff",
        select: "name employeeId email department",
        populate: {
          path: "department",
        },
      })

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: leaves,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================================
// Approve / Reject Leave
// ================================
export const updateLeaveStatus = async (req, res) => {

  try {

    const { status, adminRemark } = req.body;

    const leave = await Leave.findByIdAndUpdate(

      req.params.id,

      {
        status,
        adminRemark,
      },

      {
        new: true,
      }

    );

    res.status(200).json({

      success: true,

      message: "Leave Updated Successfully",

      data: leave,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};