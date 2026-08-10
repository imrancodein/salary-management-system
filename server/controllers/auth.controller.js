import {
  loginService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";

// lOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);

    return res.status(result.statusCode).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CHANGE PASSWORD FUNCTION
export const changePassword = async (req, res) => {
  try {
    const result = await changePasswordService(req.user.id, req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const result = await forgotPasswordService(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const result = await resetPasswordService(
      req.params.token,
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