import API from "../api/axios";

// ========================================
// ADMIN
// ========================================

// Create Program Expense
export const createProgramExpense = async (data) => {
  const response = await API.post(
    "/program-expenses",
    data
  );

  return response.data;
};


// Get All Program Expenses
export const getAllProgramExpenses = async () => {
  const response = await API.get(
    "/program-expenses"
  );

  return response.data;
};


// Get Single Program Expense
export const getProgramExpenseById = async (id) => {
  const response = await API.get(
    `/program-expenses/${id}`
  );

  return response.data;
};


// Approve / Reject Expense
export const updateExpenseStatus = async (
  expenseId,
  data
) => {
  const response = await API.put(
    `/program-expenses/expense/${expenseId}/status`,
    data
  );

  return response.data;
};


// Update Returned Amount
export const updateReturnedAmount = async (
  id,
  data
) => {
  const response = await API.put(
    `/program-expenses/${id}/returned`,
    data
  );

  return response.data;
};


// ========================================
// STAFF
// ========================================

// Get My Programs
export const getMyProgramExpenses = async () => {
  const response = await API.get(
    "/program-expenses/my"
  );

  return response.data;
};


// Get My Expenses of a Program
export const getMyProgramExpenseItems = async (
  programExpenseId
) => {
  const response = await API.get(
    `/program-expenses/my/${programExpenseId}`
  );

  return response.data;
};


// Add Expense
export const addProgramExpenseItem = async (
  data
) => {
  const response = await API.post(
    "/program-expenses/expense",
    data
  );

  return response.data;
};





export const addProgramExpense = async (data) => {
  const response = await API.post(
    "/program-expenses/expense",
    data
  );

  return response.data;
};