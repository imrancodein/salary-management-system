import API from "../api/axios";

// Get All Departments
export const getDepartments = async () => {
  const response = await API.get("/departments");
  return response.data;
};

// Create Department
export const createDepartment = async (data) => {
  const response = await API.post("/departments", data);
  return response.data;
};

// Update Department
export const updateDepartment = async (id, data) => {
  const response = await API.put(`/departments/${id}`, data);
  return response.data;
};

// Delete Department
export const deleteDepartment = async (id) => {
  const response = await API.delete(`/departments/${id}`);
  return response.data;
};
// getAllDepartment
export const getAllDepartment = async () => {
  const response = await API.get("/departments");

  return response.data;
};