import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllAttendance } from "../../services/attendance.service";
import { getAllDepartment } from "../../services/department.service";
import exportAttendanceExcel from "../../utils/exportAttendanceExcel";
import ManualAttendanceModal from "../../components/attendance/ManualAttendanceModal";
import { getAllStaff } from "../../services/staff.service";
import LocationModal from "../../components/admin/LocationModal"
const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
const [status, setStatus] = useState("");
const [department, setDepartment] = useState("");
const [staffList, setStaffList] = useState([]);
const [openAttendanceModal, setOpenAttendanceModal] = useState(false);
const [departments, setDepartments] = useState([]);

const [selectedLocation, setSelectedLocation] = useState(null);

const [openLocationModal, setOpenLocationModal] =
  useState(false);
  const loadAttendance = async () => {
    try {
      const response = await getAllAttendance();
      setAttendance(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const loadDepartments = async () => {
  try {
    const response = await getAllDepartment();
    setDepartments(response.data);
  } catch (error) {
    console.log(error);
  }
};

// load staff
const loadStaff = async () => {
  try {
    const response = await getAllStaff();

    setStaffList(response.data);

  } catch (error) {
    console.log(error);
  }
};
// handleLocationClick
const handleLocationClick = (attendance) => {

  setSelectedLocation(attendance);

  setOpenLocationModal(true);

};
  useEffect(() => {
    loadAttendance();
     loadDepartments();
     loadStaff();
  }, []);

  return (
    <AdminLayout>
        {/* search */}
<div className="mb-5">

 </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  <h1 className="text-3xl font-bold">
    Attendance Management
  </h1>

  <button
    onClick={() => setOpenAttendanceModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
  >
    + Add Attendance
  </button>

</div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">

  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
{/* Download button */}
<button
  onClick={() => exportAttendanceExcel(attendance)}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
>
  Export Excel
</button>
    {/* Search */}
    <input
      type="text"
      placeholder="Search Employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg px-4 py-2"
    />

    {/* Department */}
    <select
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="">All Department</option>

      {departments.map((dept) => (
        <option
          key={dept._id}
          value={dept.name}
        >
          {dept.name}
        </option>
      ))}
    </select>

    {/* Status */}
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="">All Status</option>
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
      <option value="Late">Late</option>
    </select>

     {/* <div className="bg-white rounded-xl shadow p-4 mb-6">

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}

   
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="border rounded-lg px-4 py-2"
    />

    
    <button
      onClick={() => {
        setSearch("");
        setDate("");
         setDepartment("");
        setStatus("");
      }}
      className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
    >
      Reset
    </button>

  </div>

    {/* </div> 
  </div> */}

</div>

      {/* search & filter */}
     

      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-4 py-3 text-left">
                    Employee
                  </th>

                  <th className="px-4 py-3 text-left">
                    Location
                  </th>

                  <th className="px-4 py-3 text-left">
                    Check In
                  </th>

                  <th className="px-4 py-3 text-left">
                    Check Out
                  </th>

                  <th className="px-4 py-3 text-left">
                    Working Hours
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>
                 

                </tr>

              </thead>

              <tbody>

                {attendance.filter((item) => {

  const matchSearch =
    search === "" ||
    item.staff?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchDepartment =
    department === "" ||
    item.staff?.department?.name === department;

  const matchStatus =
    status === "" ||
    item.status === status;

    const matchDate =
  !date ||
  (item.checkIn &&
    new Date(item.checkIn)
      .toISOString()
      .split("T")[0] === date);

  return (
    matchSearch &&
    matchDepartment &&
    matchStatus &&
    matchDate
  );
  

})
.map((item) => (


                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-4 py-4">
                      {item.staff?.name}
                    </td>
{/* view buttion */}
                  <td className="px-4 py-4">
  {item.location?.type === "Office" ? (
    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
      🏢 Office
    </span>
  ) : (
    <button
      onClick={() => handleLocationClick(item)}
      className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200"
    >
      📍 View
    </button>
  )}
</td>

                    <td className="px-4 py-4">
                      {item.checkIn
                        ? new Date(item.checkIn).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </td>

                    <td className="px-4 py-4">
                      {item.checkOut
                        ? new Date(item.checkOut).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </td>

                    <td className="px-4 py-4">
                      {item.workingHours || 0} Hrs
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Late"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}
{/* ManualAttendanceModel */}
<ManualAttendanceModal
  open={openAttendanceModal}
  setOpen={setOpenAttendanceModal}
  staffList={staffList}
    loadAttendance={loadAttendance}
/>
{/* LocationModel */}
<LocationModal
    isOpen={openLocationModal}
    attendance={selectedLocation}
    onClose={() => {
        setOpenLocationModal(false);
        setSelectedLocation(null);
    }}
/>
    </AdminLayout>




  );
};

export default AttendanceManagement;