import { useEffect, useState } from "react";
import { getAllStaff } from "../../services/staff.service";
import { generateSalary } from "../../services/salary.service";

const SalaryFormModal = ({
  open,
  setOpen,
  loadSalary,
}) => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    staff: "",
    month: "",
    year: new Date().getFullYear(),
    basicSalary: "",
    bonus: "",
    deduction: "",
    netSalary: 0,
  });

  // Load Staff
  const loadStaff = async () => {
    try {
      const response = await getAllStaff();
      setStaffList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open) {
      loadStaff();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...formData,
      [name]: value,
    };

    // Auto Fill Basic Salary
    if (name === "staff") {
      const selectedStaff = staffList.find(
        (item) => item._id === value
      );

      if (selectedStaff) {
        updatedForm.basicSalary =
          selectedStaff.basicSalary || "";
      }
    }

    updatedForm.netSalary =
      (Number(updatedForm.basicSalary) || 0) +
      (Number(updatedForm.bonus) || 0) -
      (Number(updatedForm.deduction) || 0);

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await generateSalary(formData);

      alert(response.message);

      await loadSalary();

      setOpen(false);

      setFormData({
        staff: "",
        month: "",
        year: new Date().getFullYear(),
        basicSalary: "",
        bonus: "",
        deduction: "",
        netSalary: 0,
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Salary Generate Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-xl rounded-xl shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">

        <h2 className="text-2xl font-bold">
          Generate Salary
        </h2>

        <button
          onClick={() => setOpen(false)}
          className="text-2xl font-bold text-gray-500 hover:text-red-600"
        >
          ✕
        </button>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-5"
      >

        {/* Employee */}
        <div>

          <label className="block mb-2 font-medium">
            Employee
          </label>

          <select
            name="staff"
            value={formData.staff}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >

            <option value="">
              Select Employee
            </option>

            {staffList.map((staff) => (

              <option
                key={staff._id}
                value={staff._id}
              >
                {staff.name}
              </option>

            ))}

          </select>

        </div>

        {/* Month & Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>

            <label className="block mb-2 font-medium">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="">
                Select Month
              </option>

              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Year
            </label>

            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

        </div>

        {/* Basic Salary */}
        <div>

          <label className="block mb-2 font-medium">
            Basic Salary
          </label>

          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Bonus & Deduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>

            <label className="block mb-2 font-medium">
              Bonus
            </label>

            <input
              type="number"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Deduction
            </label>

            <input
              type="number"
              name="deduction"
              value={formData.deduction}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

        </div>

        {/* Net Salary */}
        <div>

          <label className="block mb-2 font-medium">
            Net Salary
          </label>

          <input
            type="number"
            value={formData.netSalary}
            readOnly
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 font-bold"
          />

        </div>
                {/* Buttons */}
        <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4 border-t">

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate Salary"}
          </button>

        </div>

      </form>

    </div>

  </div>
);

};

export default SalaryFormModal;