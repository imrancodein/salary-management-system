import { useEffect, useState } from "react";
import { getDepartments } from "../../services/department.service";
import { addStaff,updateStaff, } from "../../services/staff.service";

const AddStaffModal = ({ open, onClose, loadStaff, staff, }) => {
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    basicSalary: "",
    joiningDate:""
  });

  useEffect(() => {
    if (open) {
      loadDepartments();
    }
  }, [open]);

  useEffect(() => {
  if (staff) {
    setFormData({
      name: staff.name || "",
      email: staff.email || "",
      phone: staff.phone || "",
      department: staff.department?._id || "",
      basicSalary: staff.basicSalary || "",
      joiningDate: staff.joiningDate
  ? new Date(staff.joiningDate).toISOString().split("T")[0]
  : "",
      });
  } else {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      basicSalary: "",
      joiningDate:""
    });
  }
}, [staff]);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    let res;

    if (staff) {
      res = await updateStaff(staff._id, formData);
    } else {
      res = await addStaff(formData);
    }

    alert(res.message);

    loadStaff();

    onClose();

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      basicSalary: "",
      joiningDate:""
    });

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center border-b p-5">

         <h2 className="text-2xl font-bold">
            {staff ? "Edit Staff" : "Add Staff"}
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
          className="p-5 space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept._id}
                value={dept._id}
              >
                {dept.name}
              </option>
            ))}

          </select>

          <input
            type="number"
            name="basicSalary"
            placeholder="Basic Salary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading  ? "Saving..."  : staff  ? "Update Staff"  : "Save Staff"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddStaffModal;