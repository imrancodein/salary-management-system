const AttendanceModal = ({
  isOpen,
  onClose,
  attendance,
}) => {
  if (!isOpen || !attendance) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-bold">
            Attendance Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          <div>
            <p className="text-gray-500 text-sm">
              Date
            </p>

            <p className="font-semibold">
              {new Date(attendance.date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Status
            </p>
            

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                attendance.status === "Present"
                  ? "bg-green-100 text-green-700"
                  : attendance.status === "Absent"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {attendance.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Check In
            </p>

            <p className="font-semibold">
              {attendance.checkIn
                ? new Date(attendance.checkIn).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Check Out
            </p>

            <p className="font-semibold">
              {attendance.checkOut
                ? new Date(attendance.checkOut).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Working Hours
            </p>

            <p className="font-semibold">
              {attendance.workingHours} Hours
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AttendanceModal;