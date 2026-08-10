import { useEffect, useState } from "react";
import StaffLayout from "../../layouts/StaffLayout";
import { getMyLeaves } from "../../services/leave.service";
import LeaveFormModal from "../../components/leave/LeaveFormModal";
import LeaveViewModal from "../../components/leave/LeaveViewModal";
const Leave = () => {

  const [leaveList, setLeaveList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
const [selectedLeave, setSelectedLeave] = useState(null);
const [openViewModal, setOpenViewModal] = useState(false);
  const loadLeaves = async () => {

    try {

      setLoading(true);

      const response = await getMyLeaves();

      setLeaveList(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <StaffLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          My Leave
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Apply Leave
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3">Type</th>

              <th className="px-4 py-3">From</th>

              <th className="px-4 py-3">To</th>

              <th className="px-4 py-3">Days</th>

              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">  Action</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-6"
                >
                  Loading...
                </td>

              </tr>

            ) : leaveList.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-6"
                >
                  No Leave Found
                </td>

              </tr>

            ) : (

              leaveList.map((item) => (

                <tr
                  key={item._id}
                  className="border-t"
                >

                  <td className="px-4 py-3">
                    {item.leaveType}
                  </td>

                  <td className="px-4 py-3">
                    {item.fromDate}
                  </td>

                  <td className="px-4 py-3">
                    {item.toDate}
                  </td>

                  <td className="px-4 py-3">
                    {item.totalDays}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* view */}
                  <td className="px-4 py-3">

  <button
    onClick={() => {
        

      setSelectedLeave(item);

      setOpenViewModal(true);

    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
  >
    View
  </button>

</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <LeaveFormModal
        open={openModal}
        setOpen={setOpenModal}
        loadLeaves={loadLeaves}
       
      />
        <LeaveViewModal
        open={openViewModal}
        setOpen={setOpenViewModal}
        leave={selectedLeave}
        />

    </StaffLayout>
  );
};

export default Leave;