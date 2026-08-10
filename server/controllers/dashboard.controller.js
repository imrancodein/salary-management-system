import { getAdminDashboardService } from "../services/dashboard.service.js";

export const getAdminDashboard = async (req, res) => {
  try {

    const data = await getAdminDashboardService();

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    console.error("Dashboard Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};