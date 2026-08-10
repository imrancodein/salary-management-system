import API from "../api/axios";

// Check In
export const checkIn = async (location) => {
  const response = await API.post("/attendance/check-in", {
    location,
  });

  return response.data;
};

// Check Out
export const checkOut = async () => {
  const response = await API.put("/attendance/check-out");
  return response.data;
};

// Attendance History
export const getAttendanceHistory = async () => {
  const response = await API.get("/attendance/history");
  return response.data;
};

// Today Attendance
export const getTodayAttendance = async () => {
  const response = await API.get("/attendance/today");
  return response.data;
};

export const addManualAttendance = async (data) => {
  const response = await API.post(
    "/attendance/manual",
    data
  );

  return response.data;
};
// getAllattendance
export const getAllAttendance = async () => {
  const response = await API.get(
    "/attendance/all"
  );

  return response.data;
};