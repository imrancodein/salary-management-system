import User from "../models/user.model.js";

const generateEmployeeId = async () => {
  // Sirf staff ke EMP IDs nikalo
  const lastEmployee = await User.findOne({
    role: "staff",
    employeeId: /^EMP\d+$/,
  }).sort({ createdAt: -1 });

  if (!lastEmployee) {
    return "EMP001";
  }

  const lastNumber = Number(lastEmployee.employeeId.substring(3));

  const nextNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;

  return `EMP${String(nextNumber).padStart(3, "0")}`;
};

export default generateEmployeeId;