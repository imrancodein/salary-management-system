import { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import AdminLayout from "../../layouts/AdminLayout";
import LeaveActionModal from "../../components/leave/LeaveActionModal";

import { getAllLeaves } from "../../services/leave.service";

const LeaveManagement = () => {

  const [leaveList, setLeaveList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedLeave, setSelectedLeave] = useState(null);

  const [search, setSearch] = useState("");
// const [departmentFilter, setDepartmentFilter] = useState("");
// const [statusFilter, setStatusFilter] = useState("");

// Pagination
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
  const [openActionModal, setOpenActionModal] =
    useState(false);

  const loadLeaves = async () => {

    try {

      setLoading(true);

      const response = await getAllLeaves();

      setLeaveList(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredLeaves = leaveList.filter((item) => {

  const employeeName =
    item.staff?.name?.toLowerCase() || "";

  const employeeId =
    item.staff?.employeeId?.toLowerCase() || "";

  return (

    employeeName.includes(
      search.toLowerCase()
    ) ||

    employeeId.includes(
      search.toLowerCase()
    )

  );

});

const totalRecords = filteredLeaves.length;

const totalPages = Math.ceil(
  totalRecords / itemsPerPage
);

const startIndex =
  (currentPage - 1) * itemsPerPage;

const currentLeaves =
  filteredLeaves.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {

    loadLeaves();

  }, []);

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Leave Management

        </h1>
        

      </div>
      <div className="flex justify-between items-center mb-5">

  <input
    type="text"
    placeholder="Search Employee..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    className="border rounded-lg px-4 py-2 w-72"
  />

</div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3">
                Employee
              </th>

              <th className="px-4 py-3">
                Department
              </th>

              <th className="px-4 py-3">
                Type
              </th>

              <th className="px-4 py-3">
                From
              </th>

              <th className="px-4 py-3">
                To
              </th>

              <th className="px-4 py-3">
                Days
              </th>

              <th className="px-4 py-3">
                Status
              </th>

              <th className="px-4 py-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-8"
                >

                  Loading...

                </td>

              </tr>

            ) : leaveList.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-8"
                >

                  No Leave Found

                </td>

              </tr>

            ) : (

              currentLeaves.map((item) => (

                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-4 py-3">
                    {item.staff?.name}
                  </td>

                  <td className="px-4 py-3">
                    {item.staff?.department?.name}
                  </td>

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

                  <td className="px-4 py-3">

                    <button
                      onClick={() => {

                        setSelectedLeave(item);

                        setOpenActionModal(true);

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

      <LeaveActionModal
        open={openActionModal}
        setOpen={setOpenActionModal}
        leave={selectedLeave}
        loadLeaves={loadLeaves}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        recordsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

    </AdminLayout>

  );

};

export default LeaveManagement;