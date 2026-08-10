import StaffLayout from "../../layouts/StaffLayout";
import { useEffect, useState } from "react";
import {  getTodayEODService} from "../../services/eod.service";
import { useNavigate } from "react-router-dom";
import { getMySalary } from "../../services/salary.service";
import { getMyLeaves } from "../../services/leave.service";
// import calculateDistance from "../utils/calculateDistance.js";

import {
  getTodayAttendance,
  checkIn,
  checkOut,
} from "../../services/attendance.service";
const Dashboard = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [salary, setSalary] = useState(null);
  const [leaves, setLeaves] = useState([]);
const [loading, setLoading] = useState(false);
const [eod, setEod] = useState(null);

const loadAttendance = async () => {
  try {
    const response = await getTodayAttendance();

    setAttendance(response.data);
  } catch (error) {
    console.log(error);
  }
};
// load EOD
const loadEOD = async () => {
  try {
    const response = await getTodayEODService();

    setEod(response.data);
  } catch (error) {
    console.log(error);
  }
};
// LodadSalarey
const loadSalary = async () => {
  try {
    const response = await getMySalary();

    const salaries = response.data || [];

    // Latest salary record
    const latestSalary = salaries.length
      ? salaries[salaries.length - 1]
      : null;

    setSalary(latestSalary);

  } catch (error) {
    console.log(error);
  }
};
// LoadLeave
const loadLeaves = async () => {
  try {
    const response = await getMyLeaves();

    // console.log("Leave API Response:", response);

    setLeaves(response?.data || []);

  } catch (error) {
    console.error(
      "Leave Load Error:",
      error
    );

    setLeaves([]);
  }
};
useEffect(() => {
  loadAttendance();
  loadEOD();
  loadSalary();
  loadLeaves();
}, []);
// handlecheck in
const handleCheckIn = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setLoading(true);

        const response = await checkIn({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        alert(response.message);

        loadAttendance();
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Check In Failed"
        );
      } finally {
        setLoading(false);
      }
    },
    () => {
      alert("Please allow location permission.");
    }
  );
};
// handlecheckout
const handleCheckOut = async () => {
  try {
    setLoading(true);

    const response = await checkOut();

    alert(response.message);

    loadAttendance();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Check Out Failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <StaffLayout>

      <h1 className="text-3xl font-bold mb-6">
        Staff Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

  <div className="flex items-center justify-between mb-5">
    <div>
      <h2 className="text-lg font-bold text-gray-800">
        Today's Attendance
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Your attendance for today
      </p>
    </div>

    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
      🕐
    </div>
  </div>

  <div className="space-y-4">

    {/* Check In */}
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Check In
      </span>

      <span className="font-semibold text-gray-800">
        {attendance?.checkIn
          ? new Date(
              attendance.checkIn
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "--"}
      </span>
    </div>

    {/* Check Out */}
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Check Out
      </span>

      <span className="font-semibold text-gray-800">
        {attendance?.checkOut
          ? new Date(
              attendance.checkOut
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "--"}
      </span>
    </div>

    {/* Working Hours */}
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Working Hours
      </span>

      <span className="font-semibold text-gray-800">
        {attendance?.workingHours
          ? `${attendance.workingHours} Hours`
          : "--"}
      </span>
    </div>

    {/* Status */}
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Status
      </span>

      <span
        className={`font-semibold ${
          attendance?.status === "Present"
            ? "text-green-600"
            : attendance?.status === "Absent"
            ? "text-red-600"
            : "text-gray-500"
        }`}
      >
        {attendance?.status || "--"}
      </span>
    </div>

  </div>

  {/* Action Button */}
  <div className="mt-6">

    {!attendance && (
      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Checking In..." : "Check In"}
      </button>
    )}

    {attendance &&
      !attendance.checkOut &&
      attendance.status !== "Absent" && (
        <button
          onClick={handleCheckOut}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-900 disabled:opacity-50 transition"
        >
          {loading ? "Checking Out..." : "Check Out"}
        </button>
      )}

    {attendance?.checkOut && (
      <div className="text-center py-3 rounded-lg bg-green-50 text-green-600 font-semibold">
        ✓ Attendance Completed
      </div>
    )}

  </div>

</div>
{/* salary */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

  <h2 className="text-gray-500">
    Salary
  </h2>

  <p className="text-3xl font-bold mt-3 text-gray-800">
    ₹{salary?.netSalary || 0}
  </p>

  <p className="text-sm text-gray-500 mt-1">
    Current Salary
  </p>

  <button
    onClick={() => navigate("/staff/salary")}
    className="mt-4 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer"
  >
    View Salary Slip
  </button>

</div>
       
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

  <h2 className="text-gray-500">
    EOD Status
  </h2>

  <p
    className={`text-2xl font-bold mt-3 ${
      eod
        ? "text-green-600"
        : "text-orange-500"
    }`}
  >
    {eod ? "Submitted ✓" : "Pending"}
  </p>

  <p className="text-sm text-gray-500 mt-2">
    {eod
      ? "Today's EOD has been submitted."
      : "Please submit your EOD."}
  </p>
{!eod && (
  <button
    onClick={() => navigate("/staff/eod")}
    className="mt-4 w-full text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer transition text-left"
  >
    Submit EOD
  </button>
)}
</div>

{/* Leave */}
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

  <h2 className="text-gray-500">
    Leave
  </h2>

  <div className="flex items-end gap-2 mt-3">
    <p className="text-3xl font-bold text-gray-800">
      {leaves.length}
    </p>

    <p className="text-sm text-gray-500 mb-1">
      Applications
    </p>
  </div>

  <p className="text-xl text-gray-500 mt-2">
    Pending:{" "}
    <span className="font-semibold text-orange-500">
      {
        leaves.filter(
          (leave) =>
            leave.status?.toLowerCase() === "pending"
        ).length
      }
    </span>
  </p>

  <button
    type="button"
    onClick={() => navigate("/staff/leave")}
    className="mt-4 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer transition"
  >
    Apply Leave
  </button>

</div>
{/* Profile */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

  <h2 className="text-gray-500">
    Profile
  </h2>

  <div className="flex items-center gap-3 mt-4">

    <img
      src={
        salary?.staff?.profilePhoto
          ? `http://localhost:5000${salary.staff.profilePhoto}`
          : "https://ui-avatars.com/api/?name=Staff"
      }
      alt="Profile"
      className="w-12 h-12 rounded-full object-cover"
    />

    <div>
      <p className="font-semibold text-gray-800">
        {salary?.staff?.name || "Staff"}
      </p>

      <p className="text-sm text-gray-500">
        Staff
      </p>
    </div>

  </div>

  <button
    type="button"
    onClick={() => navigate("/staff/profile")}
    className="mt-4 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:underline cursor-pointer transition"
  >
    View Profile
  </button>

</div>

      </div>
<div className="mt-6">

  {/* Check In */}
  {/* {!attendance && (
    <button
      onClick={handleCheckIn}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
    >
      {loading ? "Checking In..." : "Check In"}
    </button>
  )} */}

  {/* Check Out */}
  {/* {attendance && !attendance.checkOut && (
    <button
      onClick={handleCheckOut}
      disabled={loading}
      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
    >
      {loading ? "Checking Out..." : "Check Out"}
    </button>
  )} */}

  {/* Attendance Completed */}
  {/* {attendance && attendance.checkOut && (
    <div className="w-full bg-green-100 text-green-700 text-center py-3 rounded-lg font-semibold">
      ✅ Attendance Completed
    </div>
  )} */}

</div>
    </StaffLayout>
  );
};

export default Dashboard;