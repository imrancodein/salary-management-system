import API from "./api";

// ============================
// Staff Apply Leave
// ============================
export const applyLeave = async (data) => {
  const response = await API.post(
    "/leaves/apply",
    data
  );

  return response.data;
};

// ============================
// Staff Leave History
// ============================
export const getMyLeaves = async () => {
  const response = await API.get(
    "/leaves/my"
  );

  return response.data;
};

// ============================
// Admin Get All Leaves
// ============================
export const getAllLeaves = async () => {
  const response = await API.get(
    "/leaves"
  );

  return response.data;
};

// ============================
// Admin Approve / Reject
// ============================
export const updateLeaveStatus = async (
  id,
  data
) => {
  const response = await API.put(
    `/leaves/${id}`,
    data
  );

  return response.data;
};