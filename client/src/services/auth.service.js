import API from "../api/axios";

// =======================
// LOGIN
// =======================
export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);

  return response.data;
};

// =======================
// CHANGE PASSWORD
// =======================
export const changePassword = async (data) => {
  const response = await API.put(
    "/auth/change-password",
    data
  );

  return response.data;
};
// Forgot Password
export const forgotPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// Reset Password
// Reset Password
export const resetPassword = async (
  token,
  newPassword,
  confirmPassword
) => {
  const response = await API.post(
    `/auth/reset-password/${token}`,
    {
      newPassword,
      confirmPassword,
    }
  );

  return response.data;
};