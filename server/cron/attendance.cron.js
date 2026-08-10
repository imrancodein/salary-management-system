import cron from "node-cron";
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import Holiday from "../models/holiday.model.js";

const attendanceCron = () => {

  // Daily 7:00 PM
  cron.schedule(
    "0 19 * * *",
    async () => {

      console.log("🚀 Attendance Cron Started");

      try {

        // India date
        const now = new Date();

        const today = new Intl.DateTimeFormat(
          "en-CA",
          {
            timeZone: "Asia/Kolkata",
          }
        ).format(now);

        console.log("📅 Attendance Date:", today);

        // Sunday Skip
        const indiaDay = new Intl.DateTimeFormat(
          "en-US",
          {
            weekday: "short",
            timeZone: "Asia/Kolkata",
          }
        ).format(now);

        if (indiaDay === "Sun") {
          console.log("⏭️ Today is Sunday");
          return;
        }

        // Holiday Skip
        const holiday = await Holiday.findOne({
          date: today,
        });

        if (holiday) {
          console.log("🎉 Holiday Found:", today);
          return;
        }

        // Active Staff
        const staffs = await User.find({
          role: "staff",
          status: true,
        });

        console.log(
          `👥 Total Active Staff: ${staffs.length}`
        );

        let absentCount = 0;

        for (const staff of staffs) {

          const attendance = await Attendance.findOne({
            staff: staff._id,
            date: today,
          });

          // No attendance found
          if (!attendance) {

            await Attendance.create({
              staff: staff._id,
              date: today,
              status: "Absent",
              checkIn: null,
              checkOut: null,
              workingHours: 0,
            });

            absentCount++;

            console.log(
              `❌ ${staff.name} → Absent`
            );

          } else {

            console.log(
              `✅ ${staff.name} → Attendance Already Exists`
            );

          }
        }

        console.log(
          `✅ Attendance Cron Completed | Absent: ${absentCount}`
        );

      } catch (error) {

        console.error(
          "❌ Attendance Cron Error:",
          error.message
        );

      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

export default attendanceCron;