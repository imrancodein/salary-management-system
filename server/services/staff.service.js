import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Department from "../models/department.model.js";

import generateEmployeeId from "../utils/generateEmployeeId.js";
import generatePassword from "../utils/generatePassword.js";
import sendEmail from "../utils/sendEmail.js";

// =====================================
// ADD STAFF
// =====================================
export const addStaffService = async ({
  name,
  email,
  phone,
  department,
  basicSalary,
  joiningDate,
  
}) => {
  // Validation
  if (!name || !email || !phone || !department || !basicSalary) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required.",
    };
  }

  // Email Check
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      statusCode: 409,
      message: "Email already exists.",
    };
  }

  // Department Check
  const departmentExists = await Department.findById(department);

  if (!departmentExists) {
    return {
      success: false,
      statusCode: 404,
      message: "Department not found.",
    };
  }

  // Employee ID
  const employeeId = await generateEmployeeId();

  // Temporary Password
  const tempPassword = generatePassword();

  // Hash Password
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // Create Staff
  const staff = await User.create({
    employeeId,
    name,
    email,
    phone,
    password: hashedPassword,
    role: "staff",
    department,
    basicSalary,
    joiningDate,
    isFirstLogin: true,
  });

  // Send Welcome Email
  const html = `
      <h2>Salary Management System</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>Your account has been created successfully.</p>

      <p><b>Employee ID :</b> ${employeeId}</p>

      <p><b>Email :</b> ${email}</p>

      <p><b>Temporary Password :</b> ${tempPassword}</p>

      <p>Please login and change your password.</p>
  `;

  await sendEmail(
    email,
    "Welcome To Salary Management System",
    html
  );

  return {
    success: true,
    statusCode: 201,
    message: "Staff added successfully.",
    data: staff,
  };
};

// =====================================
// GET ALL STAFF
// =====================================
export const getAllStaffService = async () => {
  const staff = await User.find({ role: "staff" })
    .populate("department")
    .sort({ createdAt: -1 });

  return {
    success: true,
    statusCode: 200,
    data: staff,
  };
};
// =====================================
// UPDATE STAFF
// =====================================
export const updateStaffService = async (
  id,
  {
    name,
    email,
    phone,
    department,
    basicSalary,
    status,
    joiningDate,
  }
) => {

  if (!name || !email || !phone || !department || !basicSalary) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required.",
    };
  }

  const staff = await User.findById(id);

  if (!staff) {
    return {
      success: false,
      statusCode: 404,
      message: "Staff not found.",
    };
  }

  const existingEmail = await User.findOne({
    email,
    _id: { $ne: id },
  });

  if (existingEmail) {
    return {
      success: false,
      statusCode: 409,
      message: "Email already exists.",
    };
  }

  const departmentExists = await Department.findById(department);

  if (!departmentExists) {
    return {
      success: false,
      statusCode: 404,
      message: "Department not found.",
    };
  }

  staff.name = name;
  staff.email = email;
  staff.phone = phone;
  staff.department = department;
  staff.basicSalary = basicSalary;
  staff.status = status;
if (joiningDate !== undefined) {
  staff.joiningDate = joiningDate;
}

  await staff.save();

  return {
    success: true,
    statusCode: 200,
    message: "Staff updated successfully.",
    data: staff,
  };
};
// =====================================
// DELETE STAFF
// =====================================
export const deleteStaffService = async (id) => {

  const staff = await User.findById(id);

  if (!staff) {
    return {
      success: false,
      statusCode: 404,
      message: "Staff not found.",
    };
  }

  await User.findByIdAndDelete(id);

  return {
    success: true,
    statusCode: 200,
    message: "Staff deleted successfully.",
  };
};

// =======================================
// GET PROFILE
// =======================================
export const getProfileService = async (userId) => {

  const user = await User.findById(userId)
    .select("-password -resetPasswordToken -resetPasswordExpire")
    .populate("department", "name");

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found.",
    };
  }

  return {
    success: true,
    statusCode: 200,
    data: user,
  };
};

// =======================================
// UPDATE PROFILE
// =======================================
export const updateProfileService = async (
  userId,
  data,
  file
) => {

  const user = await User.findById(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found.",
    };
  }

  // Editable Fields
  user.phone = data.phone || user.phone;
  user.address = data.address || user.address;
  user.emergencyContact =
    data.emergencyContact || user.emergencyContact;
  // user.bloodGroup =
  //   data.bloodGroup || user.bloodGroup;


  // Profile Photo
  if (file) {
    user.profilePhoto = `/uploads/${file.filename}`;
  }

  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: "Profile Updated Successfully.",
    data: user,
  };
};