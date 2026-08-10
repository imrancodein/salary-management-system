import cron from "node-cron";
import Attendance from "../models/attendance.model.js";
import EOD from "../models/eod.model.js";
// console.log("✅ AutoCheckout Cron Loaded");
const autoCheckoutCron = () => {

  // Daily 6:05 PM
  cron.schedule("5 18 * * *", async () => {
 console.log("🚀 AutoCheckout Cron Started");
    try {

      const today = new Date().toISOString().split("T")[0];

  const attendances = await Attendance.find({
  date: today,
  checkIn: { $ne: null },
  checkOut: null,
  status: { $ne: "Absent" },
});
      console.log("Pending Checkout:", attendances.length);

      const checkoutTime = new Date();

      checkoutTime.setHours(18, 0, 0, 0); // 6:00 PM

for (const attendance of attendances) {

  // Check EOD
  const eod = await EOD.findOne({
    staff: attendance.staff,
    date: today,
  });

  // EOD not submitted
  if (!eod) {
    console.log(
      `⏭️ EOD Pending → Checkout Skipped`
    );

    continue;
  }

  // EOD submitted → Auto Checkout
  attendance.checkOut = checkoutTime;

  const hours =
    (checkoutTime - attendance.checkIn) /
    (1000 * 60 * 60);

  attendance.workingHours =
    Math.round(hours * 100) / 100;

  await attendance.save();

  console.log(
    `✅ Auto Checkout → ${attendance.staff}`
  );
}

      console.log(
        `✅ Auto Checkout Completed (${attendances.length})`
      );

    } catch (error) {

      console.error(
        "Auto Checkout Cron Error:",
        error.message
      );
    }
  });
};

export default autoCheckoutCron;