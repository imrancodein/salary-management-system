import { useState } from "react";
import { addManualAttendance } from "../../services/attendance.service";
const ManualAttendanceModal = ({
  open,
  setOpen,
   staffList,
   loadAttendance,
}) => {

  const [formData, setFormData] = useState({
    staff: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
    reason: "",
  });

//   handlesubmit
const handleSubmit = async () => {
  try {
    await addManualAttendance(formData);

   // 👇 Table Refresh
    await loadAttendance();

    setFormData({
      staff: "",
      date: "",
      checkIn: "",
      checkOut: "",
      status: "Present",
      reason: "",
    });

    setOpen(false);

    alert("Attendance Added Successfully");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );

  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Manual Attendance
        </h2>

        <div className="space-y-4">

        {/* employee Input */}
        <select
  value={formData.staff}
  onChange={(e) =>
    setFormData({
      ...formData,
      staff: e.target.value,
    })
  }
  className="w-full border rounded-lg px-4 py-2"
>
  <option value="">
    Select Employee
  </option>

  {staffList?.map((staff) => (
    <option
      key={staff._id}
      value={staff._id}
    >
      {staff.name} ({staff.employeeId})
    </option>
  ))}
</select>

        <input
  type="date"
  value={formData.date}
  onChange={(e) =>
    setFormData({
      ...formData,
      date: e.target.value,
    })
  }
  className="w-full border rounded-lg px-4 py-2"
/>

        <input
  type="time"
  value={formData.checkIn}
  onChange={(e) =>
    setFormData({
      ...formData,
      checkIn: e.target.value,
    })
  }
  className="w-full border rounded-lg px-4 py-2"
/>

          <input
  type="time"
  value={formData.checkOut}
  onChange={(e) =>
    setFormData({
      ...formData,
      checkOut: e.target.value,
    })
  }
  className="w-full border rounded-lg px-4 py-2"
/>

          <select
  value={formData.status}
  onChange={(e) =>
    setFormData({
      ...formData,
      status: e.target.value,
    })
  }
  className="w-full border rounded-lg px-4 py-2"
>
  <option value="Present">Present</option>
  <option value="Late">Late</option>
  <option value="Absent">Absent</option>
</select>

          <textarea
            rows="3"
            placeholder="Reason"
            className="w-full border rounded-lg px-4 py-2"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setOpen(false)}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

         <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
            Save Attendance
            </button>

        </div>

      </div>

    </div>
  );
};

export default ManualAttendanceModal;