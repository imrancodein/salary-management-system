import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import API from "../../api/axios";
import {
  createProgramExpense,
} from "../../services/programExpense.service";

const ProgramExpenseForm = ({ onSuccess }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffLoading, setStaffLoading] = useState(true);

  const [formData, setFormData] = useState({
    staff: "",
    programName: "",
    programDate: "",
    location: "",
    description: "",
    advanceAmount: "",
  });

  // ========================================
  // LOAD STAFF
  // ========================================

  const loadStaff = async () => {
    try {
      setStaffLoading(true);

      const response = await API.get("/staff");

      setStaff(
        response.data?.data ||
          response.data?.staff ||
          []
      );
    } catch (error) {
      console.error("Staff Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load staff."
      );
    } finally {
      setStaffLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.staff) {
      alert("Please select staff.");
      return;
    }

    if (!formData.programName.trim()) {
      alert("Please enter program name.");
      return;
    }

    if (!formData.programDate) {
      alert("Please select program date.");
      return;
    }

    if (!formData.location.trim()) {
      alert("Please enter location.");
      return;
    }

    if (
      !formData.advanceAmount ||
      Number(formData.advanceAmount) <= 0
    ) {
      alert("Please enter valid advance amount.");
      return;
    }

    try {
      setLoading(true);

      await createProgramExpense({
        staff: formData.staff,
        programName: formData.programName.trim(),
        programDate: formData.programDate,
        location: formData.location.trim(),
        description: formData.description.trim(),
        advanceAmount: Number(
          formData.advanceAmount
        ),
      });

      alert("Program created successfully.");

      setFormData({
        staff: "",
        programName: "",
        programDate: "",
        location: "",
        description: "",
        advanceAmount: "",
      });

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error(
        "Create Program Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create program."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
          <FaPlus />
        </div>

        <div>

          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Create Program Expense
          </h2>

          <p className="text-sm text-gray-500">
            Assign program advance to staff.
          </p>

        </div>

      </div>


      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Staff + Program */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Staff */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff Name
            </label>

            <select
              name="staff"
              value={formData.staff}
              onChange={handleChange}
              disabled={staffLoading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >

              <option value="">
                {staffLoading
                  ? "Loading Staff..."
                  : "Select Staff"}
              </option>

              {staff.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                  {member.employeeId
                    ? ` - ${member.employeeId}`
                    : ""}
                </option>
              ))}

            </select>

          </div>


          {/* Program Name */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Name
            </label>

            <input
              type="text"
              name="programName"
              value={formData.programName}
              onChange={handleChange}
              placeholder="Enter program name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>


        {/* Date + Location + Amount */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Date */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Date
            </label>

            <input
              type="date"
              name="programDate"
              value={formData.programDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Location */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* Advance */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Advance Amount
            </label>

            <input
              type="number"
              name="advanceAmount"
              value={formData.advanceAmount}
              onChange={handleChange}
              placeholder="₹ 0"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>


        {/* Description */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter program description..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

        </div>


        {/* Submit */}

        <div className="flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >

            <FaPlus />

            {loading
              ? "Creating..."
              : "Create Program"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default ProgramExpenseForm;