import API from "../api/axios";

// Generate Salary
export const generateSalary = async (data) => {
  const response = await API.post(
    "/salary/generate",
    data
  );

  return response.data;
};

// Get All Salary
export const getAllSalary = async () => {
  const response = await API.get("/salary");

  return response.data;
};

// Delete Salary
export const deleteSalary = async (id) => {
  const response = await API.delete(
    `/salary/${id}`
  );

  return response.data;
};

// Update Salary
export const updateSalary = async (id, data) => {
  const response = await API.put(
    `/salary/${id}`,
    data
  );

  return response.data;
};
// ===========================
// MARK SALARY PAID
// ===========================
export const markSalaryPaid = async (
  id,
  paymentMode
) => {
  const response = await API.put(
    `/salary/${id}/pay`,
    {
      paymentMode,
    }
  );

  return response.data;
};
// Staff My Salary
// ==========================

export const getMySalary = async () => {
  const response = await API.get("/salary/my-salary");
  return response.data;
};