import API from "../api/axios";

// ==========================
// Add Staff
// ==========================
export const addStaff = async (data) => {
  const response = await API.post("/staff", data);
  return response.data;
};

// ==========================
// Get All Staff
// ==========================
export const getAllStaff = async () => {
  const response = await API.get("/staff");
  return response.data;
};

// ==========================
// Update Staff
// ==========================
export const updateStaff = async (id, data) => {
  const response = await API.put(`/staff/${id}`, data);
  return response.data;
};

// ==========================
// Delete Staff
// ==========================
export const deleteStaff = async (id) => {
  const response = await API.delete(`/staff/${id}`);
  return response.data;
};



// Get Profile
export const getProfile = async () => {
  const response = await API.get("/staff/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (data) => {
  const response = await API.put(
    "/staff/profile",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};