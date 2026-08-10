import { useEffect, useState } from "react";
import { updateLeaveStatus } from "../../services/leave.service";

const LeaveActionModal = ({
  open,
  setOpen,
  leave,
  loadLeaves,
}) => {
  const [adminRemark, setAdminRemark] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (leave) {
      setAdminRemark(leave.adminRemark || "");
    }
  }, [leave]);

  if (!open || !leave) return null;

  const handleStatus = async (status) => {
    try {
      setLoading(true);

      await updateLeaveStatus(leave._id, {
        status,
        adminRemark,
      });

      await loadLeaves();

      setOpen(false);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-full max-w-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Leave Details
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="font-semibold">
              Employee
            </label>

            <p>{leave.staff?.name}</p>
          </div>

          <div>
            <label className="font-semibold">
              Department
            </label>

            <p>
              {leave.staff?.department?.name}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Leave Type
            </label>

            <p>{leave.leaveType}</p>
          </div>

          <div>
            <label className="font-semibold">
              Status
            </label>

            <p>{leave.status}</p>
          </div>

          <div>
            <label className="font-semibold">
              From Date
            </label>

            <p>{leave.fromDate}</p>
          </div>

          <div>
            <label className="font-semibold">
              To Date
            </label>

            <p>{leave.toDate}</p>
          </div>

          <div>
            <label className="font-semibold">
              Total Days
            </label>

            <p>{leave.totalDays}</p>
          </div>

        </div>

        <div className="mt-5">

          <label className="font-semibold">
            Reason
          </label>

          <div className="border rounded-lg p-3 mt-2 bg-gray-50">

            {leave.reason}

          </div>

        </div>

        <div className="mt-5">

          <label className="font-semibold">
            Admin Remark
          </label>

          <textarea
            rows={4}
            value={adminRemark}
            onChange={(e) =>
              setAdminRemark(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Enter Remark..."
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setOpen(false)}
            className="border px-5 py-2 rounded-lg"
          >
            Close
          </button>

          <button
            disabled={loading}
            onClick={() =>
              handleStatus("Rejected")
            }
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Reject
          </button>

          <button
            disabled={loading}
            onClick={() =>
              handleStatus("Approved")
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Approve
          </button>

        </div>

      </div>

    </div>
  );
};

export default LeaveActionModal;