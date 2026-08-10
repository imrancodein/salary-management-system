import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import seedAdmin from "./utils/seedAdmin.js";
import attendanceCron from "./cron/attendance.cron.js";
import autoCheckoutCron from "./cron/autoCheckout.cron.js";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  
  try {
    
    await connectDB();

    // Create Default Admin
  
    await seedAdmin();
    attendanceCron();
    autoCheckoutCron();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();


