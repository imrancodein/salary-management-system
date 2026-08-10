import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
// LOGINSERVICE
export const loginService = async ({ email, password }) => {
  // 1. Validation
  if (!email || !password) {
    return {
      success: false,
      statusCode: 400,
      message: "Email and Password are required.",
    };
  }

  // 2. Find User
  const user = await User.findOne({ email }).populate("department");

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "Invalid email or password.",
    };
  }

  // 3. Check Password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return {
      success: false,
      statusCode: 401,
      message: "Invalid email or password.",
    };
  }

  // 4. Check User Status
  if (!user.status) {
    return {
      success: false,
      statusCode: 403,
      message: "Your account has been deactivated.",
    };
  }

  // 5. First Login (Only Staff)
 // Generate JWT
const token = generateToken(user._id, user.role);

if (user.role === "staff" && user.isFirstLogin) {
  return {
    success: true,
    statusCode: 200,
    firstLogin: true,
    message: "Please change your password before continuing.",

    token,

    user: {
      id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      profilePhoto: user.profilePhoto,
    },
  };
 }

  // 6. Generate JWT
  // const token = generateToken(user._id, user.role);

  // 7. Success Response
  return {
    success: true,
    statusCode: 200,
    message: "Login successful.",
    token,
    user: {
      id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      profilePhoto: user.profilePhoto,
    },
  };
};

// CHANGEPASSWORDSERVICE
export const changePasswordService = async (
  userId,
  { oldPassword, newPassword, confirmPassword }
) => {
  // Validation
  if (!oldPassword || !newPassword || !confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "New password and confirm password do not match.",
    };
  }

  // Find User
  const user = await User.findById(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found.",
    };
  }

  // Verify Old Password
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return {
      success: false,
      statusCode: 400,
      message: "Old password is incorrect.",
    };
  }

  // Hash New Password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.isFirstLogin = false;

  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: "Password changed successfully.",
  };
};

// FORGOTPASSWORDSERVICE
export const forgotPasswordService = async ({ email }) => {
  // 1. Validation
  if (!email) {
    return {
      success: false,
      statusCode: 400,
      message: "Email is required.",
    };
  }

  // 2. Check User
  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found.",
    };
  }

  // 3. Generate Reset Token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 4. Save Token in Database
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 Minutes

  await user.save();

  // 5. Create Reset Link
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // 6. Email Template
  const html = `
      <h2>Salary Management System</h2>

      <p>Hello <b>${user.name}</b>,</p>

      <p>You requested to reset your password.</p>

      <p>
        <a href="${resetUrl}">
          Click Here to Reset Password
        </a>
      </p>

      <p>This link will expire in 15 minutes.</p>

      <p>If you didn't request this, ignore this email.</p>
  `;

  // 7. Send Email
  await sendEmail(
    user.email,
    "Reset Your Password",
    html
  );

  return {
    success: true,
    statusCode: 200,
    message: "Password reset link sent successfully.",
  };
};

// Reset password
export const resetPasswordService = async (
  token,
  { newPassword, confirmPassword }
) => {
  // Validation
  if (!newPassword || !confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "Passwords do not match.",
    };
  }

  // Find User by Token
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid or expired reset token.",
    };
  }

  // Hash New Password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.isFirstLogin = false;

  // Clear Token
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: "Password reset successfully.",
  };
};