import { FaFilter, FaTimes } from "react-icons/fa";

const ProgramExpenseFilter = ({
  programs = [],
  staffFilter,
  statusFilter,
  onStaffChange,
  onStatusChange,
  onClear,
}) => {
  // Unique staff
  const staffList = [];

  programs.forEach((program) => {
    if (
      program.staff?._id &&
      !staffList.some(
        (staff) => staff._id === program.staff._id
      )
    ) {
      staffList.push(program.staff);
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-blue-600" />

        <h2 className="text-lg font-semibold text-gray-800">
          Filter Programs
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Staff */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff Name
          </label>

          <select
            value={staffFilter}
            onChange={(e) =>
              onStaffChange(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              All Staff
            </option>

            {staffList.map((staff) => (
              <option
                key={staff._id}
                value={staff._id}
              >
                {staff.name}
                {staff.employeeId
                  ? ` - ${staff.employeeId}`
                  : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Settlement Pending">
              Settlement Pending
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

        {/* Clear */}
        <div className="flex items-end">

          <button
            type="button"
            onClick={onClear}
            disabled={
              !staffFilter && !statusFilter
            }
            className="flex items-center justify-center gap-2 w-full md:w-auto bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 px-5 py-2.5 rounded-lg font-medium transition"
          >
            <FaTimes />
            Clear Filter
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProgramExpenseFilter;