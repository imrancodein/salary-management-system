import { useEffect, useState } from "react";
import { applyLeave } from "../../services/leave.service";

const LeaveFormModal = ({
  open,
  setOpen,
  loadLeaves,
}) => {

  const [formData, setFormData] = useState({
    leaveType: "Casual",
    fromDate: "",
    toDate: "",
    totalDays: 0,
    reason: "",
  });

  useEffect(() => {

    if (
      formData.fromDate &&
      formData.toDate
    ) {

      const from = new Date(formData.fromDate);

      const to = new Date(formData.toDate);

      const diff =
        Math.floor(
          (to - from) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      setFormData((prev) => ({
        ...prev,
        totalDays:
          diff > 0 ? diff : 0,
      }));

    }

  }, [
    formData.fromDate,
    formData.toDate,
  ]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await applyLeave(formData);

      await loadLeaves();

      alert(
        "Leave Applied Successfully"
      );

      setFormData({
        leaveType: "Casual",
        fromDate: "",
        toDate: "",
        totalDays: 0,
        reason: "",
      });

      setOpen(false);

    } catch (error) {

  console.log("Leave Error:", error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Something went wrong"
  );

}

  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Apply Leave
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Casual">
              Casual Leave
            </option>

            <option value="Sick">
              Sick Leave
            </option>

            <option value="Earned">
              Earned Leave
            </option>
          </select>

          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            value={formData.totalDays}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />

          <textarea
            rows="4"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Apply
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default LeaveFormModal;