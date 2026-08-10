import API from "../api/axios"

// Staff Apply Leave
export const applyLeave = async (data) => {
  const response = await API.post("/leaves/apply", data);
  return response.data;
};

// Staff Leave History
export const getMyLeaves = async () => {
  const response = await API.get("/leaves/my");
  return response.data;
};

// Admin - All Leave List
export const getAllLeaves = async () => {
  const response = await API.get("/leaves");
  return response.data;
};

// Admin - Approve / Reject Leave
export const updateLeaveStatus = async (id, data) => {
  const response = await API.put(`/leaves/${id}`, data);
  return response.data;
};