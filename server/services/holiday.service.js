import Holiday from "../models/holiday.model.js";

// Create Holiday
export const createHolidayService = async (data) => {

  const holiday = await Holiday.create(data);

  return holiday;

};

// Get All Holidays
export const getAllHolidayService = async () => {

  return await Holiday.find().sort({
    date: 1,
  });

};

// Get Single Holiday
export const getHolidayByIdService = async (id) => {

  return await Holiday.findById(id);

};

// Update Holiday
export const updateHolidayService = async (
  id,
  data
) => {

  return await Holiday.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );

};

// Delete Holiday
export const deleteHolidayService = async (
  id
) => {

  return await Holiday.findByIdAndDelete(id);

};