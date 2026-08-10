import API from "../api/axios";

// Get All
export const getAllHoliday = async () => {
  const response = await API.get("/holiday");
  return response.data;
};

// Create
export const createHoliday = async (data) => {
  const response = await API.post("/holiday", data);
  return response.data;
};

// Update
export const updateHoliday = async (id, data) => {
  const response = await API.put(`/holiday/${id}`, data);
  return response.data;
};

// Delete
export const deleteHoliday = async (id) => {
  const response = await API.delete(`/holiday/${id}`);
  return response.data;
};