import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import salaryRoutes from "./routes/salary.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import eodRoutes from "./routes/eod.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import holidayRoutes from "./routes/holiday.routes.js";
import path from "path";
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/eod", eodRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/holiday", holidayRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Salary Management System API Running...",
});
});
export default app;


