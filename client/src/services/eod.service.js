import API from "../api/axios";
// Submit EOD
export const submitEOD = async (data) => {
  const response = await API.post("/eod", data);
  return response.data;
};

// My EOD
export const getMyEOD = async () => {
  const response = await API.get("/eod/my");
  return response.data;
};

// Admin
export const getAllEOD = async () => {
  const response = await API.get("/eod/all");
  return response.data;
};
export const getMonthlyEODReport = async (
  staffId,
  month,
  year
) => {

  const response = await API.get(

    `/eod/report/${staffId}?month=${month}&year=${year}`

  );

  return response.data;

};

// getTodayEOD
export const getTodayEODService = async (userId) => {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const eod = await EOD.findOne({
    staff: userId,
    date: today,
  });

  return {
    success: true,
    statusCode: 200,
    data: eod,
  };
};