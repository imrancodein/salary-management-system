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