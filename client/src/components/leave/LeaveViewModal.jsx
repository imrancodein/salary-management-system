const LeaveViewModal = ({
  open,
  setOpen,
  leave,
}) => {

  if (!open || !leave) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">

        <div className="flex justify-between items-center border-b p-4">

          <h2 className="text-xl font-bold">
            Leave Details
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <div className="p-5 space-y-4">

          <div>

            <p className="text-gray-500 text-sm">
              Leave Type
            </p>

            <p className="font-semibold">
              {leave.leaveType}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-gray-500 text-sm">
                From
              </p>

              <p className="font-medium">
                {leave.fromDate}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                To
              </p>

              <p className="font-medium">
                {leave.toDate}
              </p>

            </div>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Total Days
            </p>

            <p className="font-medium">
              {leave.totalDays}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Status
            </p>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                leave.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : leave.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {leave.status}
            </span>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Reason
            </p>

            <div className="bg-gray-50 border rounded-lg p-3 mt-1">

              {leave.reason}

            </div>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Admin Remark
            </p>

            <div className="bg-gray-50 border rounded-lg p-3 mt-1">

              {leave.adminRemark
                ? leave.adminRemark
                : "Waiting for Approval"}

            </div>

          </div>

        </div>

        <div className="border-t p-4 flex justify-end">

          <button
            onClick={() => setOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

};

export default LeaveViewModal;