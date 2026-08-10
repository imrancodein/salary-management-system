import {
  addStaffService,
  getAllStaffService,
   updateStaffService,
  deleteStaffService,
   getProfileService,
  updateProfileService,
} from "../services/staff.service.js";

// ADD STAFF
export const addStaff = async (req, res) => {
  try {
    const result = await addStaffService(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL STAFF
export const getAllStaff = async (req, res) => {
  try {
    const result = await getAllStaffService();

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================
// UPDATE STAFF
// ============================
export const updateStaff = async (req, res) => {
  try {
    const result = await updateStaffService(
      req.params.id,
      req.body
    );

    return res.status(result.statusCode).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// DELETE STAFF
// ============================
export const deleteStaff = async (req, res) => {
  try {
    const result = await deleteStaffService(req.params.id);

    return res.status(result.statusCode).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get my salary
export const getMySalary = async (req, res) => {
  try {
    const result = await getMySalaryService(req.user._id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET PROFILE
// ============================
export const getProfile = async (req, res) => {
  try {

    const result = await getProfileService(req.user._id);

    return res.status(result.statusCode).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ============================
// UPDATE PROFILE
// ============================
export const updateProfile = async (req, res) => {
  try {
    const result = await updateProfileService(
      req.user._id,
      req.body,
      req.file
    );

    return res.status(result.statusCode).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};