import {
  addDepartmentService,
  getAllDepartmentsService,
    updateDepartmentService,
  deleteDepartmentService,
} from "../services/department.service.js";

// ============================
// ADD DEPARTMENT
// ============================
export const addDepartment = async (req, res) => {
  try {
    const result = await addDepartmentService(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET ALL DEPARTMENTS
// ============================
export const getAllDepartments = async (req, res) => {
  try {
    const result = await getAllDepartmentsService();

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ============================
// UPDATE DEPARTMENT
// ============================
export const updateDepartment = async (req, res) => {
  try {
    const result = await updateDepartmentService(
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
// DELETE DEPARTMENT
// ============================
export const deleteDepartment = async (req, res) => {
  try {
    const result = await deleteDepartmentService(req.params.id);

    return res.status(result.statusCode).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

