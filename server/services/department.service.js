import Department from "../models/department.model.js";

// ============================
// ADD DEPARTMENT
// ============================
export const addDepartmentService = async ({ name, description }) => {
  // Validation
  if (!name) {
    return {
      success: false,
      statusCode: 400,
      message: "Department name is required.",
    };
  }

  // Check Duplicate
  const existingDepartment = await Department.findOne({
    name: name.trim(),
  });

  if (existingDepartment) {
    return {
      success: false,
      statusCode: 409,
      message: "Department already exists.",
    };
  }

  // Create Department
  const department = await Department.create({
    name: name.trim(),
    description,
  });

  return {
    success: true,
    statusCode: 201,
    message: "Department added successfully.",
    data: department,
  };
};

// ============================
// GET ALL DEPARTMENTS
// ============================
export const getAllDepartmentsService = async () => {
  const departments = await Department.find({
    status: true,
  }).sort({
    createdAt: -1,
  });

  return {
    success: true,
    statusCode: 200,
    message: "Departments fetched successfully.",
    data: departments,
  };
};
// ============================
// UPDATE DEPARTMENT
// ============================
export const updateDepartmentService = async (id, { name, description }) => {

  if (!name) {
    return {
      success: false,
      statusCode: 400,
      message: "Department name is required.",
    };
  }

  const department = await Department.findById(id);

  if (!department) {
    return {
      success: false,
      statusCode: 404,
      message: "Department not found.",
    };
  }

  // Check Duplicate
  const existingDepartment = await Department.findOne({
    name: name.trim(),
    _id: { $ne: id },
  });

  if (existingDepartment) {
    return {
      success: false,
      statusCode: 409,
      message: "Department already exists.",
    };
  }

  department.name = name.trim();
  department.description = description;

  await department.save();

  return {
    success: true,
    statusCode: 200,
    message: "Department updated successfully.",
    data: department,
  };
};

// ============================
// DELETE DEPARTMENT
// ============================
export const deleteDepartmentService = async (id) => {

  const department = await Department.findById(id);

  if (!department) {
    return {
      success: false,
      statusCode: 404,
      message: "Department not found.",
    };
  }

  await Department.findByIdAndDelete(id);

  return {
    success: true,
    statusCode: 200,
    message: "Department deleted successfully.",
  };
};