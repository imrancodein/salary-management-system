import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getAllStaff,deleteStaff, } from "../../services/staff.service";
import { getDepartments } from "../../services/department.service";
import AddStaffModal from "../../components/staff/AddStaffModal";
import { getImageUrl } from "../../api/axios";
import SalaryFilter from "../../components/common/SalaryFilter";
const StaffManagement = () => {
const [staffList, setStaffList] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [departments, setDepartments] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState("");
const [selectedStaff, setSelectedStaff] = useState(null);

const loadStaff = async () => {
  try {
    const res = await getAllStaff();

    // console.log(res.data);

    setStaffList(res.data);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
// HANDLE DELETE
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this staff?"
  );

  if (!confirmDelete) return;

  try {
    const response = await deleteStaff(id);

    alert(response.message);

    loadStaff();
  } catch (error) {
    alert(error.response?.data?.message || "Delete Failed");
  }
};
const loadDepartments = async () => {
  try {
    const response = await getDepartments();
    setDepartments(response.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadStaff();
  loadDepartments();
}, []);
const filteredStaff = staffList.filter((staff) => {
  const matchesSearch =
    staff.name.toLowerCase().includes(search.toLowerCase()) ||
    staff.email.toLowerCase().includes(search.toLowerCase()) ||
    staff.employeeId.toLowerCase().includes(search.toLowerCase());

  const matchesDepartment =
    selectedDepartment === "" ||
    staff.department?._id === selectedDepartment;

  return matchesSearch && matchesDepartment;
});
  const [openModal, setOpenModal] = useState(false);
  return (
    <AdminLayout>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

  <div>

    <h1 className="text-2xl md:text-3xl font-bold">
      Staff Management
    </h1>

    <p className="text-gray-500 text-sm md:text-base">
      Manage all staff members
    </p>

  </div>

  <button
    onClick={() => setOpenModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg w-full md:w-auto transition"
  >
    + Add Staff
  </button>

</div>

      {/* Search & filter section */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

   <input
    type="text"
    placeholder="Search by Name, Email or Employee ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-3 w-full"
  />


    <select
  value={selectedDepartment}
  onChange={(e) => setSelectedDepartment(e.target.value)}
  className="border rounded-lg px-4 py-2 w-full md:w-60"
>
  <option value="">All Departments</option>

  {departments.map((department) => (
    <option key={department._id} value={department._id}>
      {department.name}
    </option>
  ))}
</select>

  </div>

</div>

{/* Staff table  */}
<div className="bg-white rounded-xl shadow overflow-x-auto">

  <table className="w-full">

    <thead className="bg-gray-100">

      <tr>

        <th className="p-4 text-left">Photo</th>
        <th className="p-4 text-left">Employee ID</th>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">Email</th>
        <th className="p-4 text-left">Department</th>
        <th className="p-4 text-left">Joining Date</th>

        <th className="p-4 text-left">Status</th>
        <th className="p-4 text-left">Action</th>

      </tr>

    </thead>
<tbody>
  {loading ? (
    <tr>
      <td colSpan="8" className="text-center p-6">
        Loading...
      </td>
    </tr>
  ) : filteredStaff.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center p-6">
        No Staff Found
      </td>
    </tr>
  ) : (
    filteredStaff.map((staff) => (
      <tr key={staff._id} className="border-t hover:bg-gray-50">

        <td className="p-4">
          {staff.profilePhoto ? (
            <img
  src={getImageUrl(staff.profilePhoto)}
  alt={staff.name}
  className="w-10 h-10 rounded-full object-cover"
/>
          ) : (
            "👤"
          )}
        </td>

        <td className="p-4">
          {staff.employeeId}
        </td>

        <td className="p-4">
          {staff.name}
        </td>

        <td className="p-4">
          {staff.email}
        </td>

        <td className="p-4">
          {staff.department?.name}
        </td>
       <td className="px-4">
        {staff.joiningDate
          ? new Date(staff.joiningDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
      </td>

        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              staff.status
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {staff.status ? "Active" : "Inactive"}
          </span>
        </td>

        <td className="p-4">
         <button
          onClick={() => {
            setSelectedStaff(staff);
            setOpenModal(true);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>

         <button
            onClick={() => handleDelete(staff._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>

      </tr>
    ))
  )}
</tbody>
  

  </table>

</div>
{/* pagination */}

<div className="flex justify-end items-center gap-3 mt-5">

  <button className="border px-4 py-2 rounded">
    Previous
  </button>

  <button className="bg-blue-600 text-white px-4 py-2 rounded">
    1
  </button>

  <button className="border px-4 py-2 rounded">
    Next
  </button>

</div>
    <AddStaffModal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setSelectedStaff(null);
      }}
      loadStaff={loadStaff}
      staff={selectedStaff}
    />
    </AdminLayout>
  );
};

export default StaffManagement;