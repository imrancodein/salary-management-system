import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepartmentManagement from "../pages/admin/DepartmentManagement";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import AdminDashboard from "../pages/admin/Dashboard";
import StaffDashboard from "../pages/staff/Dashboard";
import StaffManagement from "../pages/admin/StaffManagement";
import Attendance from "../pages/staff/Attendance";
import SalaryManagement from "../pages/admin/SalaryManagement";
import MySalary from "../pages/staff/MySalary";
import AttendanceManagement from "../pages/admin/AttendanceManagement";
import EOD from "../pages/staff/EOD";
import { Toaster } from "react-hot-toast";
import EODManagement from "../pages/admin/EODManagement";
import Profile from "../pages/staff/Profile";
// import StaffLeave from "../pages/staff/LeaveManagement";
// import Leave from "../pages/admin/Leave";
import Holiday from "../pages/staff/Holiday";
import HolidayCalendar from "../pages/admin/HolidayCalendar";
import LeaveManagement from "../pages/admin/LeaveManagement";
import Leave from "../pages/staff/Leave"
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Staff */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        {/* Admin staff */}
        <Route path="/admin/staff" element={<StaffManagement />} />

{/* Departmentmanagment */}
<Route  path="/admin/departments"  element={<DepartmentManagement />}/>
<Route   path="/staff/attendance"   element={<Attendance />}/>

{/* SALLERY */}
<Route path="/admin/salary"  element={<SalaryManagement />}/>

{/* staff salry */}
<Route  path="/staff/salary"  element={<MySalary />}/>
{/* Attendance Management */}
<Route path="/admin/attendance" element={<AttendanceManagement />}/>

{/* staff leave */}
<Route
  path="/staff/leave"
  element={<Leave />}
/>
{/* admin leave */}
<Route
  path="/admin/leaves"
  element={<LeaveManagement />}
/>
{/* EOD */}
<Route
  path="/staff/eod"
  element={<EOD />}
/>
{/* EOD Admin */}
<Route
  path="/admin/eod"
  element={<EODManagement />}
/>
<Route
  path="/admin/holiday"
  element={<HolidayCalendar />}
/>
<Route
  path="/staff/holiday"
  element={<Holiday />}
/>
<Route
  path="/staff/profile"
  element={<Profile />}
/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;