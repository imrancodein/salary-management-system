import AdminLayout from "../../layouts/AdminLayout";
import AddDepartmentModal from "../../components/department/AddDepartmentModal";
import { useEffect, useState } from "react";
import { getDepartments,deleteDepartment, } from "../../services/department.service";
const DepartmentManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);   
   const loadDepartments = async () => { 
  try {
    const response = await getDepartments();

    setDepartments(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this department?"
  );

  if (!confirmDelete) return;

  try {
    const response = await deleteDepartment(id);

    alert(response.message);

    loadDepartments();
  } catch (error) {
    alert(error.response?.data?.message || "Delete Failed");
  }
};

useEffect(() => {
  loadDepartments();
}, []);

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Department Management
          </h1>

          <p className="text-gray-500">
            Manage all departments
          </p>
        </div>

       <button
        onClick={() => setOpenModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg w-full md:w-auto"
        >
        + Add Department
        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <input
          type="text"
          placeholder="Search Department..."
          className="w-full md:w-80 border rounded-lg px-4 py-3"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Department</th>

              <th className="text-left p-4">Created At</th>

              <th className="text-left p-4">Action</th>

            </tr>

          </thead>
<tbody>
  {loading ? (
    <tr>
      <td colSpan="3" className="text-center p-6">
        Loading...
      </td>
    </tr>
  ) : departments.length === 0 ? (
    <tr>
      <td colSpan="3" className="text-center p-6 text-gray-500">
        No Departments Found
      </td>
    </tr>
  ) : (
    departments.map((department) => (
      <tr key={department._id} className="border-t hover:bg-gray-50">

        <td className="p-4">
          {department.name}
        </td>

        <td className="p-4">
          {new Date(department.createdAt).toLocaleDateString()}
        </td>

        <td className="p-4">

          <button
            onClick={() => {
                setSelectedDepartment(department);
                setOpenModal(true);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
            >
            Edit
            </button>

          <button
            onClick={() => handleDelete(department._id)}
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
      <AddDepartmentModal
        open={openModal}
        onClose={() => {
            setOpenModal(false);
            setSelectedDepartment(null);
        }}
        loadDepartments={loadDepartments}
        department={selectedDepartment}
        />

    </AdminLayout>
  );
};

export default DepartmentManagement;