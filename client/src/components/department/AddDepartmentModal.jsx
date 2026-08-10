import { useEffect, useState } from "react";
import { createDepartment,updateDepartment, } from "../../services/department.service";
const AddDepartmentModal = ({ open, onClose, loadDepartments,department, }) => {
const [departmentName, setDepartmentName] = useState("");
const [loading, setLoading] = useState(false);
useEffect(() => {
  if (department) {
    setDepartmentName(department.name);
  } else {
    setDepartmentName("");
  }
}, [department]);
//  handlesubmit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!departmentName.trim()) {
    alert("Department Name is required");
    return;
  }

  try {
    setLoading(true);

    let response;

    if (department) {
      response = await updateDepartment(department._id, {
        name: departmentName,
      });
    } else {
      response = await createDepartment({
        name: departmentName,
      });
    }

    alert(response.message);

    setDepartmentName("");

    await loadDepartments();

    onClose();

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

      <div className="bg-white rounded-xl w-full max-w-md">

        <div className="border-b p-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            {department ? "Edit Department" : "Add Department"}
            </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Department Name
            </label>

            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Enter Department Name"
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg w-full sm:w-auto"
            >
              Cancel
            </button>

           <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg w-full sm:w-auto disabled:bg-gray-400"
            >
            {loading
                ? "Saving..."
                : department
                ? "Update Department"
                : "Save Department"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddDepartmentModal;