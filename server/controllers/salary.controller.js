import {
  generateSalaryService,
  getAllSalaryService,
   markSalaryPaidService,
   getMySalaryService,
} from "../services/salary.service.js";
export const generateSalary = async (req, res) => {
  try {
    const result = await generateSalaryService(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// getAllSalary
export const getAllSalary = async (req, res) => {
  try {
    const result = await getAllSalaryService();

    return res.status(result.statusCode).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// marked salary
export const markSalaryPaid = async (req, res) => {
  try {

    const { paymentMode } = req.body;

    const result = await markSalaryPaidService(
      req.params.id,
      paymentMode,
      req.user.id
    );

    return res.status(result.statusCode).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// get my salary
export const getMySalary = async (req, res) => {
  try {
    const result = await getMySalaryService(req.user._id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};