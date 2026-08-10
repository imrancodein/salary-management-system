import {
  createHolidayService,
  getAllHolidayService,
  getHolidayByIdService,
  updateHolidayService,
  deleteHolidayService,
} from "../services/holiday.service.js";

// Create
export const createHoliday = async (
  req,
  res
) => {

  try {

    const holiday =
      await createHolidayService(req.body);

    res.status(201).json({
      success: true,
      message:
        "Holiday Added Successfully",
      data: holiday,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get All
export const getAllHoliday = async (
  req,
  res
) => {

  try {

    const holidays =
      await getAllHolidayService();

    res.json({
      success: true,
      data: holidays,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Get By Id
export const getHolidayById = async (
  req,
  res
) => {

  try {

    const holiday =
      await getHolidayByIdService(
        req.params.id
      );

    res.json({
      success: true,
      data: holiday,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Update
export const updateHoliday = async (
  req,
  res
) => {

  try {

    const holiday =
      await updateHolidayService(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      message:
        "Holiday Updated Successfully",
      data: holiday,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Delete
export const deleteHoliday = async (
  req,
  res
) => {

  try {

    await deleteHolidayService(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Holiday Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};